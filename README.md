# Solar Comfort Tool
A web tool for assessing the impact of facade choices on occupant comfort in sunny conditions. <https://payette.github.io/Solar-Comfort-Tool/>


# New Developer Setup
Use Node 16, and install node dependencies:

    fnm use 16
    npm install

Run the app locally:

    npm start


# Regression Tests
In order to run regression tests you will need to install Puppeteer dependencies (Linux or Windows Subsystem for Linux):

    sudo apt-get update

    sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev


Make sure to run regression tests before every commit:

    npm run test-regression


If you make a change to the model that changes the output of the regression tests. You will need to regenerate the GOLD files. Do that with the following command:

    npm run regenerate-gold

This will update the CSV files in the regression-gold folder, make sure to look at the files and make sure that the changes in the files you expected to happen, did happen, and no additional changes to the files happened.