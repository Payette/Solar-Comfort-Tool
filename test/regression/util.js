const { promises: { readFile } } = require("fs");
require('colors');
const Diff = require('diff');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}
exports.delay = delay;

exports.testCompareRegression = (goldFile, newContents, testName) => {
    return readFile(goldFile)
    .then(fileBuffer => {
        const goldContents = fileBuffer.toString();

        if (newContents !== goldContents) {
            console.error(`'${testName}' failed, diff vs gold file:`);
            const diff = Diff.diffChars(goldContents, newContents);
            let numberOfDifferences = 0;
            diff.forEach((part) => {
                // green for additions, red for deletions
                // grey for common parts
                const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
                if(part.added || part.removed) {
                    numberOfDifferences++;
                }
                process.stderr.write(part.value[color]);
            });
            if(numberOfDifferences > 0) {
                console.error('csv differs from gold, csv from test run: ');
                console.error(newContents);
                expect(true).toBe(false);
            } else {
                // strict equals differed, but our DIFF ignoring certain whitespace
                // said we are fine, so we'll call this good :)
                expect(true).toBe(true);
            }
        } else {
            expect(true).toBe(true);
        }
    }).catch(error => {
        console.error(error.message);
        expect(true).toBe(false);
    });
}

exports.case2On = async (page) => {
    const case2btn = await page.$x("//button[@name='button1']");
    case2btn[0].click();
    await delay(3000);
}

exports.updateInput = async (page, input) => {
    await page.evaluate(input => {
        let el = document.getElementById(input.id);
        if(input.value) {
            el.value = input.value + '';
            el.blur();
        } else {
            if(input.command === "click") {
                el.click();
            }
        }
    }, input);
    await delay(250);

    if(input.id === "dsAnnual") {
        await delay(1500);
    }
    else if(input.command === "click") {
        await delay(3000);
    }
}

exports.regressionTests = [
    // Default regression test
    {
        name: "defaults",
        inputs: []
    },
    // Time regression tests - Month, Day, Hour
    {
        name: "month",
        inputs: [
            { id: "mon", value: 1 },
            { id: "mon1", value: 2 }
        ]
    },
    {
        name: "day",
        inputs: [
            { id: "mon", value: 10 },
            { id: "day", value: 15 },
            { id: "mon1", value: 9 },
            { id: "day1", value: 10 }
        ]
    },
    {
        name: "day1",
        inputs: [
            { id: "mon", value: 6 },
            { id: "day", value: 7 },
            { id: "mon1", value: 7 },
            { id: "day1", value: 8 },
        ]
    },
    {
        name: "day2",
        inputs: [
            { id: "mon", value: 3 },
            { id: "day", value: 22 },
            { id: "mon1", value: 4 },
            { id: "day1", value: 14 },
        ]
    },
    {
        name: "hour",
        inputs: [
            { id: "dsHour", command: "click" },
            { id: "hour", value: 14 },
            { id: "hour1", value: 16 }
        ]
    },
    {
        name: "month-day-hour",
        inputs: [
            { id: "dsHour", command: "click" },
            { id: "mon", value: 5 },
            { id: "day", value: 4 },
            { id: "hour", value: 9 },
            { id: "mon1", value: 3 },
            { id: "day1", value: 11 },
            { id: "hour1", value: 11 }
        ]
    },
    {
        name: "month-day-hour1",
        inputs: [
            { id: "dsHour", command: "click" },
            { id: "mon", value: 8 },
            { id: "day", value: 18 },
            { id: "hour", value: 15 },
            { id: "mon1", value: 8 },
            { id: "day1", value: 26 },
            { id: "hour1", value: 14 }
        ]
    },
    {
        name: "month-day-hour2",
        inputs: [
            { id: "dsHour", command: "click" },
            { id: "mon", value: 12 },
            { id: "day", value: 30 },
            { id: "hour", value: 13 },
            { id: "mon1", value: 11 },
            { id: "day1", value: 17 },
            { id: "hour1", value: 12 }
        ]
    },
    // Climate regression tests - Latitude
    {
        name: "climate",
        inputs: [
            { id: "lat", value: 10 },
            { id: "lat1", value: 50 }
        ]
    },
    {
        name: "climate1",
        inputs: [
            { id: "lat", value: 2 },
            { id: "lat1", value: 60 }
        ]
    },
    // Room Geometry regression tests - Room Orientation, Length, Depth
    {
        name: "room-geometry",
        inputs: [
            { id: "north", value: 45 },
            { id: "north1", value: -90 },
            { id: "wallDep", value: 20 },
            { id: "wallDep1", value: 60 },
            { id: "wallWidth", value: 20 },
            { id: "wallWidth1", value: 60 }
        ]
    },
    {
        name: "room-geometry1",
        inputs: [
            { id: "north", value: 60 },
            { id: "north1", value: -60 },
            { id: "wallDep", value: 34 },
            { id: "wallDep1", value: 59 },
            { id: "wallWidth", value: 34 },
            { id: "wallWidth1", value: 59 }
        ]
    },
    // Window Geometry regression tests - Window Height from Sill, Sill Height, Window Width, Window-to-Wall Ratio
    {
        name: "window-geometry",
        inputs: [
            { id: "windowHeight", value: 9.5 },
            { id: "windowHeight1", value: 5 },
            { id: "sill", value: 4 },
            { id: "sill1", value: 0 },
            { id: "windowWidth", value: 30 },
            { id: "windowWidth1", value: 8 },
            { id: "glazingRatioCheck", command: "click" },
            { id: "glazing", value: 55 },
            { id: "glazing1", value: 20 }
        ]
    },
    // Shade Geometry regression tests - all inputs
    // horizontal shades
    {
        name: "horizontal-shades",
        inputs: [
            { id: "hShadeNum", value: 3 },
            { id: "hShadeNum1", value: 2 },
            { id: "hShadeDep", value: 2 },
            { id: "hShadeDep1", value: 3 },
            { id: "hShadeSpace", value: 2 },
            { id: "hShadeSpace1", value: 4 },
            { id: "hShadeDist", value: 1 },
            { id: "hShadeDist1", value: 2 },
            { id: "hShadeHeight", value: -4 },
            { id: "hShadeHeight1", value: 2 },
            { id: "hShadeAngle", value: 45 },
            { id: "hShadeAngle1", value: 75 },
        ]
    },
    // vertical shades
    {
        name: "vertical-shades",
        inputs: [
            { id: "vShadeNum", value: 3 },
            { id: "vShadeNum1", value: 4 },
            { id: "vShadeDep", value: 1 },
            { id: "vShadeDep1", value: 2 },
            { id: "vShadeSpace", value: 7 },
            { id: "vShadeSpace1", value: 4 },
            { id: "vShadeStart1", value: 'R' },
            { id: "vShadeShift", value: 1 },
            { id: "vShadeShift1", value: -1 },
            { id: "vShadeDist", value: 1 },
            { id: "vShadeDist1", value: 2 },
            { id: "vShadeOn1", command: "click" },
            { id: "vShadeHeight1", value: 2 },
            { id: "vShadeScale1", value: 2 },
        ]
    },
    // horizontal + vertical shades
    {
        name: "horizontal-vertical-shades",
        inputs: [
            { id: "hShadeNum", value: 2 },
            { id: "hShadeNum1", value: 4 },
            { id: "hShadeDep", value: 2 },
            { id: "hShadeSpace", value: 4 },
            { id: "hShadeSpace1", value: 2 },
            { id: "hShadeDist", value: 1 },
            { id: "hShadeDist1", value: 2 },
            { id: "hShadeHeight", value: -1 },
            { id: "hShadeHeight1", value: 1 },
            { id: "hShadeAngle", value: 75 },
            { id: "hShadeAngle1", value: 60 },
            { id: "vShadeNum", value: 2 },
            { id: "vShadeNum1", value: 4 },
            { id: "vShadeDep", value: 4 },
            { id: "vShadeDep1", value: 2 },
            { id: "vShadeSpace", value: 7 },
            { id: "vShadeSpace1", value: 4 },
            { id: "vShadeStart1", value: 'R' },
            { id: "vShadeShift", value: 1 },
            { id: "vShadeShift1", value: -1 },
            { id: "vShadeDist", value: 1 },
            { id: "vShadeDist1", value: 2 },
            { id: "vShadeOn1", command: "click" },
            { id: "vShadeHeight1", value: 2 },
            { id: "vShadeScale1", value: 2 },

        ]
    },
    // Annual Mode regression test - defaults and various inputs
    {
        name: "annual-defaults",
        inputs: [
            { id: "dsAnnual", command: "click" }
        ]
    },
    {
        name: "annual",
        inputs: [
            { id: "mon", value: 10 },
            { id: "day", value: 24 },
            { id: "lat", value: 39 },
            { id: "north", value: 72 },
            { id: "wallDep", value: 38 },
            { id: "windowHeight", value: 8 },
            { id: "windowWidth", value: 17.5 },
            { id: "hShadeNum", value: 2 },
            { id: "hShadeAngle", value: 81 },
            { id: "dsAnnual", command: "click" },
        ]
    }    
]