require('expect-puppeteer');
const { promises: { writeFile } } = require("fs");
const { regressionTests, updateInput } = require("./util");

async function generateGold(fileName, inputs) {
  jest.setTimeout(5000);
  await page.goto('http://localhost:3000/?debug=true');

  for(let i=0; i<inputs.length; i++) {
    updateInput(page, inputs[i]);
  }

  const csvEl = await page.waitForSelector("#debugcsv");
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