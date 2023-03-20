// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {

    mapping(address => bool) public voters;
    mapping(address => uint) public voteCount;
    address[] public candidates; 
    address public owner;
    
    event CandidateAdded(address indexed candidate);
    event VoteCast(address indexed voter, address indexed candidate);

    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized.");
        _;
    }

    function addCandidate(address candidate) public onlyOwner{
        require(msg.sender == owner,"You are not the Authorized Owner");
        candidates.push(candidate);
    }

    function vote(address candidate) public {
        require(!voters[msg.sender], "Already voted.");
        voters[msg.sender] = true;
        voteCount[candidate]++;
        emit VoteCast(msg.sender, candidate);
    }



    function getVoteCount(address candidate) public view returns (uint) {
        return voteCount[candidate];
    }

    function getCandidates() public view returns (address[] memory) {
        return candidates;
    }
    
    function getWinner() public view returns (address winner) {
    uint highestVoteCount = 0;
    for (uint i = 0; i < candidates.length; i++) {
        if (voteCount[candidates[i]] > highestVoteCount) {
            highestVoteCount = voteCount[candidates[i]];
            winner = candidates[i];
        } else if (voteCount[candidates[i]] == highestVoteCount) {
            winner = address(0); // There is a tie
        }
    }
    return winner;
}
}
