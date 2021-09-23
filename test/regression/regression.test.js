require('expect-puppeteer');
const { testCompareRegression, regressionTests, updateInput, case2On, delay } = require("./util");

jest.setTimeout(60000);
async function runAndVerifyAgainstGold(fileName, inputs) {
  await page.goto('http://localhost:3000/?debug=true');
  await delay(3000)
  case2On(page);

  for(let i=0; i<inputs.length; i++) {
    updateInput(page, inputs[i]);
  }

  const csvEl = await page.waitForSelector("#debugcsv", { timeout: 60000 });
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