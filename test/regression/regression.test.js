require('expect-puppeteer');
const { testCompareRegression, regressionTests } = require("./util");

async function runAndVerifyAgainstGold(fileName, inputs) {
  await page.goto('http://localhost:3000/?debug=true');

  inputs.forEach(input => {
    page.type(input.id, input.value + '');
  })

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