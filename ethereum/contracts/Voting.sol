// SPDX-License-Identifier: MIT
pragma solidity >0.8.9;

// Sistema de votação
// Regras: caso o numero de votos aprovador for a metade ou maior de todos os votos o caso, será aprovado
// cada voting será somente um caso
// criação de uma factory de Voting

contract FactoryVoting {
    address payable[] public votings;

    function createVoting(string memory nameCase) public {
        address newVoting = address(new Voting(nameCase));
        votings.push(payable(newVoting));
    }

    function getVotingDeployed()
        public
        view
        returns (address payable[] memory)
    {
        return votings;
    }
}

contract Voting {
    struct Case {
        string nameCase;
        uint256 countAccept;
        uint256 countNotAccept;
        bool approve;
        bool finished;
        mapping(address => bool) approvers;
        mapping(address => bool) notApprovers;
    }

    Case[] public c;
    uint256 private timeMax;

    constructor(string memory _nameCase) {
        Case storage newCase = c.push();
        newCase.nameCase = _nameCase;
        timeMax = block.timestamp + 2 minutes;
    }

    modifier timeCase() {
        require(block.timestamp < timeMax, "Time exceeded");
        _;
    }

    // criar caso
    function createCaso(string memory _nameCase) public {
        Case storage newCase = c.push();
        newCase.nameCase = _nameCase;
        newCase.countAccept = 0;
        newCase.countNotAccept = 0;
        newCase.approve = false;
        newCase.finished = false;
    }

    // aceitar caso
    function votingAcceptCase(uint256 index) public timeCase {
        Case storage newVotingCase = c[index];
        require(!newVotingCase.approvers[msg.sender], "you already voting");
        require(!newVotingCase.notApprovers[msg.sender], "you already voting");
        newVotingCase.approvers[msg.sender] = true;
        newVotingCase.countAccept++;
    }

    // nao aceitar caso
    function votingDenyCase(uint256 index) public timeCase {
        Case storage newVotingCase = c[index];
        require(!newVotingCase.approvers[msg.sender], "you already voting");
        require(!newVotingCase.notApprovers[msg.sender], "you already voting");
        newVotingCase.notApprovers[msg.sender] = true;
        newVotingCase.countNotAccept++;
    }

    function approveCase(uint256 index) public {
        require(block.timestamp > timeMax, "Case in progress");
        Case storage verifyCase = c[index];

        if (verifyCase.countAccept >= verifyCase.countNotAccept) {
            verifyCase.approve = true;
            verifyCase.finished = true;
        } else {
            verifyCase.approve = false;
            verifyCase.finished = true;
        }
    }
}
