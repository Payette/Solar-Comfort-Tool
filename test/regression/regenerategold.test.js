require('expect-puppeteer');
const { promises: { writeFile } } = require("fs");
const { regressionTests, updateInput, case2On, delay } = require("./util");

jest.setTimeout(500000);
async function generateGold(fileName, inputs) {
  page.on('console', (msg) => console.log(msg.text()));

  await page.goto('http://localhost:3000/?debug=true&hidemrtcalculations=true', {
    waitUntil: 'load',
  });
  await delay(3000)
  await case2On(page);

  for(let i=0; i<inputs.length; i++) {
    updateInput(page, inputs[i]);
  }
  updateInput(page, { id: "all_testing_inputs_set", command: "click" })

  const csvEl = await page.waitForSelector("#debugcsv", { timeout: 450000 });
  await delay(2000)
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