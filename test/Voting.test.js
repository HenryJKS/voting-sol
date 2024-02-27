const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/FactoryVoting.json');
const compiledVoting = require('../ethereum/build/Voting.json');

let accounts;
let factory;
let votingAddress;
let voting;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '2000000' });
    
    await factory.methods.createVoting('Teste').send({
        from: accounts[0],
        gas: '1000000'
    });

    [votingAddress] = await factory.methods.getVotingDeployed().call();
    voting = await new web3.eth.Contract(compiledVoting.abi, votingAddress);
})

describe("Voting Contract", () => {
    it("Deploy contracts", async () => {
        assert.ok(factory.options.address);
        assert.ok(voting.options.address);
    });

    it("Create a voting", async () => {
        await voting.methods.createCaso('Teste').send({
            from: accounts[0],
            gas: '1000000'
        });

        const isVote = await voting.methods.c(0).call();

        assert(isVote);
    })

    it("Voting Accept a case", async() => {
        await voting.methods.createCaso('Teste').send({
            from: accounts[0],
            gas: '1000000'
        });

        const votingAccept = await voting.methods.votingAcceptCase(0).send({
            from: accounts[0],
            gas: '1000000'
        });


        assert(votingAccept);
    })

    it("Voting Not Accept a Case", async() => {
        await voting.methods.createCaso('Teste').send({
            from: accounts[0],
            gas: '1000000'
        });
        
        const votingNotAccept = await voting.methods.votingDenyCase(0).send({
            from: accounts[0],
            gas: '1000000'
        });
        
        assert(votingNotAccept);
    })

    it('Finish Voting', async() => {
        await voting.methods.createCaso('Teste').send({
            from: accounts[0],
            gas: '1000000'
        });

        const finishVoting = await voting.methods.approveCase(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        assert(finishVoting);
    })
})