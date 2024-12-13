const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');


async function readInput() {
    try {
        const filePath = resolve('./input.txt');
        const fileContents = await readFile(filePath, { encoding: 'utf8' });
        return fileContents;
        //console.log(fileContents);
    } catch (err: any) {
        console.error(err.message);
        throw err;
    }
  }

readInput()
    .then(input => {
        const inputLists = parseInputToLists(input);
        const left = sortNumbers(parseToNumber(inputLists.left));
        const right = sortNumbers(parseToNumber(inputLists.right));

        const pairs = pairNumbers(left, right);
        const totalDistance = pairs.map(calculateDistance).reduce((acc, curr) => acc + curr, 0);
        console.log(`Total distance: ${totalDistance}`);
    });

function parseInputToLists(input: string) {
    return input
        .split('\n') // lines
        .map(line => line.split(' ', ).filter(i => i)) // [0],[1]
        .reduce(
            (acc, currentLine) => { 
                acc.left.push(currentLine[0]);
                acc.right.push(currentLine[1]);
                return acc;
            }, 
            ({ left: new Array<string>(), right: new Array<string>()}) 
        );
}


function sortNumbers(n: Array<number>): Array<number>{
    return Object.assign([], n).sort((a, b) => a - b);
}

function parseToNumber(s: Array<string>): Array<number>{
    return s.map(i => parseInt(i, 10));
}

function pairNumbers(n1: Array<number>, n2: Array<number>): Array<[number, number]>{
    return n1.map((val, idx) => [val, n2[idx]]);//this can lead to unexpected side effects if n2.length is shorter/longer
}

function calculateDistance(t: [number,number]): number {
    return Math.abs(t[0] - t[1]);//force negative to positive so we dont have to sort again;
}