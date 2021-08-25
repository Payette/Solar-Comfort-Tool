require('expect-puppeteer');
const { promises: {readFile} } = require("fs");

describe('Regression', () => {
    it('passes regression', async () => {
        jest.setTimeout(5000);
        console.log('visiting website...');
        await page.goto('http://localhost:3000/?debug=true');
        console.log('visited website');

        const csvEl = await page.waitForSelector("#debugcsv");
        let newCsvContents = await page.evaluate(el => el.textContent, csvEl)
      
        return readFile('regression-gold/defaults.csv')
        .then(fileBuffer => {
          const goldContents = fileBuffer.toString();

          if(newCsvContents !== goldContents) {
            // TODO print git diff, or something...
            expect(true).toBe(false);
          } else {
            console.log('files match, regression passed.')
            expect(true).toBe(true);
          }
        }).catch(error => {
          console.error(error.message);
          fail();
        });
      })
});