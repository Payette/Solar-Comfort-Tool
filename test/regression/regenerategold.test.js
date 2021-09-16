require('expect-puppeteer');
const { promises: { writeFile } } = require("fs");
const { regressionTests, updateInput, case2On, delay } = require("./util");

jest.setTimeout(60000);
async function generateGold(fileName, inputs) {
  await page.goto('http://localhost:3000/?debug=true');
  await delay(1000);
  case2On(page);

  for(let i=0; i<inputs.length; i++) {
    updateInput(page, inputs[i]);
  }

  const csvEl = await page.waitForSelector("#debugcsv", { timeout: 60000 });
  let csvContents = await page.evaluate(el => el.textContent, csvEl)

  return writeFile(fileName, csvContents, {});
}

describe('Regression', () => {
  regressionTests.forEach(regression => {
    it('generate gold ' + regression.name, async () => {
      return generateGold(`regression-gold/${regression.name}.csv`, regression.inputs);
    }) 
  });
});