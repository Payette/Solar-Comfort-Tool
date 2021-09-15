# EPW Scraping
These scripts scrape EPW web filese for Summer Cooling Setpoints

## Running

    cd old-util/utilities
    source env/bin/activate

Every few few years you'll probably need to re-run collect_weather_files_links
and download_weather_files_links

    xvfb-run python3 utilities.py

## New Developer Setup (1 time)
On Linux Ubuntu or inside Windows Subsystem for Linux (Ubuntu)

    sudo apt install python3
    python3 -m venv env
    source env/bin/activate

    python3 -m pip install beautifulsoup4
    python3 -m pip install html5lib

    git clone https://github.com/kiorky/spynner.git
    cd spynner
    python setup.py install

    python3 -m pip install pyppeteer

    sudo apt install xvfb








    sudo add-apt-repository ppa:rock-core/qt4
    sudo apt update
    sudo apt install libqt4-declarative libqt4* libqtcore4 libqtgui4 libqtwebkit4 qt4*

    wget http://archive.ubuntu.com/ubuntu/pool/universe/q/qt-assistant-compat/libqtassistantclient4_4.6.3-7build1_amd64.deb
    sudo apt-get install ./libqtassistantclient4_4.6.3-7build1_amd64.deb
    wget http://archive.ubuntu.com/ubuntu/pool/universe/p/python-qt4/python-qt4_4.12.1+dfsg-2_amd64.deb
    sudo apt-get install ./python-qt4_4.12.1+dfsg-2_amd64.deb
    wget http://archive.ubuntu.com/ubuntu/pool/universe/p/python-pyaudio/python-pyaudio_0.2.11-1build2_amd64.deb
    sudo apt-get install ./python-pyaudio_0.2.11-1build2_amd64.deb

    


Update install dependencies

    python3 -m pip install urllib2


