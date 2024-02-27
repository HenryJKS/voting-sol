const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const votingPath = path.resolve(__dirname, "contracts", "Voting.sol");
let source = fs.readFileSync(votingPath, "utf8");

let input = {
    language: 'Solidity',
    sources: {
        "Voting.sol": {
            content: source
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            },
        },
    },
};

let output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Voting.sol"];

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + ".json"),
        output[contract]
    )
}