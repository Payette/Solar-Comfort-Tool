require('expect-puppeteer');
const { promises: { writeFile } } = require("fs");

describe('Regression', () => {
    it('generates defaults gold', async () => {
        jest.setTimeout(5000);
        await page.goto('http://localhost:3000/?debug=true');

        const csvEl = await page.waitForSelector("#debugcsv");
        let csvContents = await page.evaluate(el => el.textContent, csvEl)
      
        return writeFile('regression-gold/defaults.csv', csvContents, {});
      })
});