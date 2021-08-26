const { promises: { readFile } } = require("fs");

exports.testCompareRegression = (goldFile, newContents) => {
    return readFile(goldFile)
        .then(fileBuffer => {
            const goldContents = fileBuffer.toString();

            if (newContents !== goldContents) {
                // TODO print git diff, or something...
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

exports.regressionTests = [
    {
        name: "defaults",
        inputs: []
    },
    {
        name: "january",
        inputs: [
            { id: "#mon", value: 1 }
        ]
    },
    {
        name: "october-15",
        inputs: [
            { id: "#mon", value: 10 },
            { id: "#day", value: 15 }
        ]
    }
]