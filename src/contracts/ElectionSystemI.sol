// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ElectionSystem {
    struct Candidate {
        uint256 id;
        string photo;
        string name;
        string age;
        string designation;
        string email;
        string manifesto;
    }

    struct Election {
        uint256 id;
        address owner;
        string title;
        string description;
        Candidate[] candidates;
        address[][] votes;
        bool isActive;
    }

    mapping(uint256 => Election) public elections;
    mapping(uint256 => mapping(address => bool)) hasVoted;

    uint256 public numberOfElections = 0;

    function createElection(
        address _owner,
        string memory _title,
        string memory _description,
        string[][] memory _candidates
    ) public returns (uint256) {
        Election storage election = elections[numberOfElections];

        election.id = numberOfElections;
        election.owner = _owner;
        election.title = _title;
        election.description = _description;
        for (uint256 i = 0; i < _candidates.length; i++) {
            Candidate memory newCandidate = Candidate({
                id: i,
                photo: _candidates[i][0],
                name: _candidates[i][1],
                age: _candidates[i][2],
                designation: _candidates[i][3],
                email: _candidates[i][4],
                manifesto: _candidates[i][5]
            });
            election.candidates.push(newCandidate);
        }
        election.votes = new address[][](_candidates.length);
        election.isActive = true;

        numberOfElections++;

        return numberOfElections - 1;
    }

    function getElections() public view returns (Election[] memory) {
        Election[] memory allElections = new Election[](numberOfElections);

        for (uint256 i = 0; i < numberOfElections; i++) {
            allElections[i] = elections[i];
        }

        return allElections;
    }

    function voteCandidate(uint256 _electionId, uint256 _candidateId) public {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election is not active.");
        require(
            !hasVoted[_electionId][msg.sender],
            "You have already voted in this election."
        );
        election.votes[_candidateId].push(msg.sender);
        hasVoted[_electionId][msg.sender] = true;
    }

    function endElection(uint256 _electionId) public {
        Election storage election = elections[_electionId];
        require(
            msg.sender == election.owner,
            "Only the owner can end the election."
        );
        election.isActive = false;
    }

    function getResults(
        uint256 _electionId
    ) public view returns (uint256[] memory) {
        Election storage election = elections[_electionId];
        require(election.isActive == false, "Election is still acitve.");
        address[][] memory votes = election.votes;
        uint256[] memory voteCounts = new uint256[](votes.length);

        for (uint256 i = 0; i < votes.length; i++) {
            voteCounts[i] = votes[i].length;
        }

        return voteCounts;
    }
}
