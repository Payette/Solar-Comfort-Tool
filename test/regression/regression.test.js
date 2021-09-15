require('expect-puppeteer');
const { testCompareRegression, regressionTests, updateInput, case2On } = require("./util");

jest.setTimeout(30000);
async function runAndVerifyAgainstGold(fileName, inputs) {
  await page.goto('http://localhost:3000/?debug=true');
  case2On(page);

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