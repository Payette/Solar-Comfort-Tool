# EPW Scraping
These scripts scrape EPW web files for Summer Cooling Setpoints. You should only need to re-run these scripts
if you want to pull updated Summer Cooling Setpoints from EPW data.

## Running

    cd utilities
    source env/bin/activate

1) Every few years you'll probably need to re-run collect_weather_files_links
and download_weather_files_links in case energyplus has changed the links

    in utilities.py uncomment the main code at the bottom that calls collect_weather_files_links
    and then run:

    cd utilities/epw_scrape
    xvfb-run python3 utilities.py

2) If the links work (just try a few links in your web browser from the CSV file)
then no need to do step 1) above, just download the files. Make sure
the code at the bottom of utilities.py that calls download_weather_files_links
is uncommented, and the code that calls collect_weather_files_links is commented,
then run:

    cd utilities/epw_scrape
    python3 utilities.py

3) Extract downloaded zip files into the directory structure we expect

    cd utilities
    python3 extractEpwDatabase.py

4) Parse summer cooling temperature from extracted files into a CoolingDDY.json file to use in our tool

    cd utilities
    python3 parseDddyDatabase.py


## New Developer Setup (1 time)
On Linux Ubuntu or inside Windows Subsystem for Linux (Ubuntu)

    sudo apt install python3
    python3 -m venv env
    source env/bin/activate

    python3 -m pip install beautifulsoup4
    python3 -m pip install html5lib
    python3 -m pip install urllib2

    git clone https://github.com/kiorky/spynner.git
    cd spynner
    python setup.py install

    python3 -m pip install pyppeteer

    sudo apt install xvfb

## On Windows Subsystem for Linux
On Ubuntu you will probably also need to install these dependencies:

    sudo add-apt-repository ppa:rock-core/qt4
    sudo apt update
    sudo apt install libqt4-declarative libqt4* libqtcore4 libqtgui4 libqtwebkit4 qt4*

    wget http://archive.ubuntu.com/ubuntu/pool/universe/q/qt-assistant-compat/libqtassistantclient4_4.6.3-7build1_amd64.deb
    sudo apt-get install ./libqtassistantclient4_4.6.3-7build1_amd64.deb
    wget http://archive.ubuntu.com/ubuntu/pool/universe/p/python-qt4/python-qt4_4.12.1+dfsg-2_amd64.deb
    sudo apt-get install ./python-qt4_4.12.1+dfsg-2_amd64.deb
    wget http://archive.ubuntu.com/ubuntu/pool/universe/p/python-pyaudio/python-pyaudio_0.2.11-1build2_amd64.deb
    sudo apt-get install ./python-pyaudio_0.2.11-1build2_amd64.deb