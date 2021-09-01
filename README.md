# Solar Comfort Tool
A web tool for assessing the impact of facade choices on occupant comfort in sunny conditions. <https://payette.github.io/Solar-Comfort-Tool/>

# New Developer Setup

    Follow instructions here for WSL Ubuntu setup of Puppeteer
    https://dotlayer.com/how-to-install-and-configure-puppeteer-on-ubuntu-18-04-lts/

    fnm use 16
    npm install

# Regression Tests
Make sure to run regression tests before every commit:

    npm run test-regression

If you make a change to the model that changes the output of the regression tests. You will need to regenerate the GOLD files. Do that with the following command:

    npm run regenerate-gold

This will update the CSV files in the regression-gold folder, make sure to look at the files and make sure that the changes in the files you expected to happen, did happen, and no additional changes to the files happened.