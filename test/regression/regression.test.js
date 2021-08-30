require('expect-puppeteer');
const { testCompareRegression, regressionTests, updateInput } = require("./util");

async function runAndVerifyAgainstGold(fileName, inputs) {
  jest.setTimeout(5000);
  await page.goto('http://localhost:3000/?debug=true');

  for(let i=0; i<inputs.length; i++) {
    updateInput(page, inputs[i]);
  }

  const csvEl = await page.waitForSelector("#debugcsv");
  let newCsvContents = await page.evaluate(el => el.textContent, csvEl)
  return testCompareRegression(fileName, newCsvContents);
}

describe('Regression', () => {
  regressionTests.forEach(regression => {
    it('passes regression ' + regression.name, async () => {
      return runAndVerifyAgainstGold(`regression-gold/${regression.name}.csv`, regression.inputs);
    })  
  })
});