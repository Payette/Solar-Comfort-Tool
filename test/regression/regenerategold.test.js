require('expect-puppeteer');
const { writeFile } = require("fs");
// TODO change to promise version
// const { promises: {readFile} } = require("fs");

describe('Regression', () => {
    it('passes regression', async () => {
        jest.setTimeout(5000);
        console.log('visiting website...');
        await page.goto('http://localhost:3000/?debug=true');
        console.log('visited website');

        const csvEl = await page.waitForSelector("#debugcsv");
        let csvContents = await page.evaluate(el => el.textContent, csvEl)
      
        return writeFile('regression-gold/defaults.csv', csvContents, {}, () => {});
      })
});