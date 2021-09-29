require('expect-puppeteer');
const { testCompareRegression, regressionTests, updateInput, case2On, delay } = require("./util");

jest.setTimeout(500000);
async function runAndVerifyAgainstGold(fileName, inputs, testName) {
  page.on('console', (msg) => console.log(msg.text()));

  await page.goto('http://localhost:3000/?debug=true', {
    waitUntil: 'load',
  });
  await delay(3000)
  case2On(page);

  for(let i=0; i<inputs.length; i++) {
    updateInput(page, inputs[i]);
  }

  const csvEl = await page.waitForSelector("#debugcsv", { timeout: 450000 });
  await delay(2000)
  let newCsvContents = await page.evaluate(el => el.textContent, csvEl)
  return testCompareRegression(fileName, newCsvContents, testName);
}

describe('Regression', () => {
  regressionTests.forEach(regression => {
    it('passes regression ' + regression.name, async () => {
      return runAndVerifyAgainstGold(`regression-gold/${regression.name}.csv`, regression.inputs, regression.name);
    })  
  })
});