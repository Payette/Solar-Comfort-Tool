require('expect-puppeteer');
const { promises: { writeFile } } = require("fs");
const { regressionTests } = require("./util");

async function generateGold(fileName, inputs) {
  await page.goto('http://localhost:3000/?debug=true');

  inputs.forEach(input => {
    page.type(input.id, input.value + '');
  })

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