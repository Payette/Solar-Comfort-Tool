import os
from bs4 import BeautifulSoup
import time
import asyncio
import urllib.request
import shutil
from pyppeteer import launch

__regions__ = ('africa_wmo_region_1', 'asia_wmo_region_2',
               'south_america_wmo_region_3', 'north_and_central_america_wmo_region_4',
               'southwest_pacific_wmo_region_5', 'europe_wmo_region_6')

# __hdr__ = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
#            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#            'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
#            'Accept-Encoding': 'none',
#            'Accept-Language': 'en-US,en;q=0.8',
#            'Connection': 'keep-alive'}

def absUrl(url):
    if 'http' in url:
        return url
    else:
        return 'https://energyplus.net' + url

def keepUrls(url):
    return not url.endswith('.mos')

async def parse_url(url, t=0.2):
    """Parse a page on energyplus.net and return the links."""
    links = []

    async def recursive_parse(url):
        print('parsing {}'.format(url))
       
        # let SPA app run, and download resulting DOM
        browser = await launch()
        page = await browser.newPage()
        await page.goto(url, { "timeout": 10000, "waitUntil": "networkidle0" } )
        theDom = await page.content()
        await browser.close()

        soup = BeautifulSoup(theDom, 'html5lib')

        linkset = (d.findAll('a') for d in soup.findAll('div', class_='btn-group-vertical'))
        _urls = tuple(absUrl(link['href']) for links in linkset for link in links)

        urls = list(filter(keepUrls, _urls))

        if urls[-1].endswith('zip'):
            links.append(urls)
        else:
            for url in urls:
                if url != 'https://energyplus.net/weather-region/north_and_central_america_wmo_region_4/USA/CA-Zones':
                    await recursive_parse(url)

    await recursive_parse(url)
    return links


async def collect_weather_files_links(folder):
    """Download all links to weather files from energyplus.net"""
    for r in __regions__:
        regionUrl = 'https://energyplus.net/weather-region/%s' % r
        file_urls = await parse_url(regionUrl)
        with open(os.path.join(folder, r + '.csv'), 'w') as outf:
            for url in file_urls:
                outf.write(','.join(url) + '\n')

def download(link, path):
    """download a file from a link."""
    with urllib.request.urlopen(link) as response, open(path, 'wb') as out_file:
        shutil.copyfileobj(response, out_file)
            
def download_weather_files_links(sourceFolder, destinationFolder):
    for r in __regions__:
        loc = os.path.join(destinationFolder, r)
        if not os.path.isdir(loc):
            os.makedirs(loc, exist_ok=True)
        print(loc)
        # open the csv file
        with open(os.path.join(sourceFolder, r + '.csv')) as inf:
            for l in inf:
                link = l.split(',')[-1]
                name = link.split('/')[-1].strip()
                destinationPath = os.path.join(loc, name)
                if os.path.exists(destinationPath):
                    print('{} already downloaded, skipping', name)
                else:
                    print('downloading "{}" {} ...'.format(name, link))
                    download(link, os.path.join(loc, name))

# Generate CSV files that will contain links to EPW files for each region
# uncomment this or the other main to run script
# async def main():
#     folder = '/home/aringler/code/Solar-Comfort-Tool/utilities/epw_scrape'
#     await collect_weather_files_links(folder)

# asyncio.get_event_loop().run_until_complete(main())


# Download all EPW files from our CSV files
def main():
    sourceFolder = '/home/aringler/code/Solar-Comfort-Tool/utilities/epw_scrape'
    destinationFolder = '/home/aringler/code/Solar-Comfort-Tool/utilities/epw_scrape/downloads'
    download_weather_files_links(sourceFolder, destinationFolder)
main()





