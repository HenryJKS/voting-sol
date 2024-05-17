// SPDX-License-Identifier: MIT
pragma solidity > 0.8.20;

// System voting
// Rules: if the number of approving votes is half or more of all the votes, the case will be approved
// each voting will be only one case
// creation of a Voting factory

contract FactoryVoting {
    address payable[] public votings;

    function createVoting(string memory nameCase, string memory description) public {
        address newVoting = address(new Voting(nameCase, description));
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
        string description;
        uint256 countAccept;
        uint256 countNotAccept;
        bool approve;
        bool finished;
        mapping(address => bool) approvers;
        mapping(address => bool) notApprovers;
    }

    Case public c;
    uint256 private timeMax;

    constructor(string memory _nameCase, string memory _description) {
        c.nameCase = _nameCase;
        c.description = _description;
        timeMax = block.timestamp + 2 minutes;
    }

    modifier timeCase() {
        require(block.timestamp < timeMax, "Time exceeded");
        _;
    }

    modifier alreadyVoting() {
        require(!c.approvers[msg.sender], "you already voting");
        require(!c.notApprovers[msg.sender], "you already voting");
        _;
    }
    
    function votingAcceptCase() public timeCase alreadyVoting{
        c.approvers[msg.sender] = true;
        c.countAccept++;
    }

    function votingDenyCase() public timeCase alreadyVoting{
        require(!c.approvers[msg.sender], "you already voting");
        require(!c.notApprovers[msg.sender], "you already voting");
        c.notApprovers[msg.sender] = true;
        c.countNotAccept++;
    }

    function approveCase() public {
        require(block.timestamp > timeMax, "Case in progress");
        require(c.finished != true, "Case already done");

        if (c.countAccept >= c.countNotAccept) {
            c.approve = true;
            c.finished = true;
        } else {
            c.approve = false;
            c.finished = true;
        }
    }
}
