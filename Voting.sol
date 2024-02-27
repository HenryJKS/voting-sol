// SPDX-License-Identifier: MIT
pragma solidity >0.8.9;

contract Voting {
    struct Case {
        string nameCase;
        uint256 approversCount;
        uint256 notApproversCount;
        bool finish;
        bool approve;
        mapping(address => bool) addressApprovers;
        mapping(address => bool) addressNotApprovers;
    }

    Case[] public c;
    uint256 private maxTime;
    event approve(address voter, uint time);
    event notApprove(address voter, uint time);

    constructor() {
        maxTime = block.timestamp + 1 minutes;
    }

    modifier finishVote() {
        require(block.timestamp <= maxTime, "The case finished");

        _;
    }

    function createCase(string memory _nameCase) public finishVote {
        Case storage voteCase = c.push();
        voteCase.nameCase = _nameCase;
        voteCase.finish = false;
        voteCase.approve = false;
    }

    function approveCase(uint256 index) public finishVote {
        require(!c[index].addressApprovers[msg.sender], "You already voting");
        require(!c[index].addressNotApprovers[msg.sender],"You already voting");

        c[index].addressApprovers[msg.sender] = true;
        c[index].approversCount++;

        emit approve(msg.sender, block.timestamp);

    }

    function notApproveCase(uint256 index) public {
        require(!c[index].addressApprovers[msg.sender], "You already voting");
        require(!c[index].addressNotApprovers[msg.sender],"You already voting");

        c[index].addressNotApprovers[msg.sender] = true;
        c[index].notApproversCount++;

        emit notApprove(msg.sender, block.timestamp);
    }

    function finishCase(uint256 index) public {
        require(block.timestamp > maxTime, "Voting in progress");
        if (c[index].approversCount >= c[index].notApproversCount) {
            c[index].finish = true;
            c[index].approve = true;
        } else {
            c[index].finish = true;
            c[index].approve = false;
        }
    }
}
