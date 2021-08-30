const { promises: { readFile } } = require("fs");
require('colors');
const Diff = require('diff');

exports.testCompareRegression = (goldFile, newContents) => {
    return readFile(goldFile)
        .then(fileBuffer => {
            const goldContents = fileBuffer.toString();

            if (newContents !== goldContents) {
                const diff = Diff.diffChars(newContents, goldContents);
                diff.forEach((part) => {
                    // green for additions, red for deletions
                    // grey for common parts
                    const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
                    process.stderr.write(part.value[color]);
                });
                console.log();

                expect(true).toBe(false);
            } else {
                console.log('files match, regression passed.')
                expect(true).toBe(true);
            }
        }).catch(error => {
            console.error(error.message);
            expect(true).toBe(false);
        });
}

exports.updateInput = async (page, input) => {
    await page.evaluate(input => {
      let el = document.getElementById(input.id);
      el.value = input.value + '';
      el.blur();
    }, input);
  }

exports.regressionTests = [
    {
        name: "defaults",
        inputs: []
    },
    {
        name: "january",
        inputs: [
            { id: "mon", value: 1 }
        ]
    },
    {
        name: "october-15",
        inputs: [
            { id: "mon", value: 10 },
            { id: "day", value: 15 }
        ]
    }
]