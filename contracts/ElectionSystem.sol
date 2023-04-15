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

    struct Post {
        uint256 id;
        string title;
        string description;
        Candidate[] candidates;
        address[][] votes;
    }

    bool public isActive = true;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => mapping(address => bool)) hasVoted;

    uint256 public numberOfPosts = 0;

    address[] public admins = [
        0x9475221374Cc437981D176f8FCc5F0634879af4D,
        0xA5A96df04BdF846717BF83785CdEBb59688E383e,
        0xB787A59f62AEce837333Dbad3037A8Babe40271c
    ];

    function checkOnlyAdmin(address _owner) private view returns (bool) {
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == _owner) {
                return true;
            }
        }
        return false;
    }

    function getAdmins() public view returns (address[] memory) {
        address[] memory output = new address[](admins.length);
        for (uint256 i = 0; i < admins.length; i++) {
            output[i] = admins[i];
        }
        return output;
    }

    function createPost(
        string memory _title,
        string memory _description,
        string[][] memory _candidates
    ) public returns (uint256) {
        require(checkOnlyAdmin(msg.sender), "Only admins can create a post!");

        Post storage post = posts[numberOfPosts];

        post.id = numberOfPosts;
        post.title = _title;
        post.description = _description;
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
            post.candidates.push(newCandidate);
        }
        post.votes = new address[][](_candidates.length);

        numberOfPosts++;

        return numberOfPosts - 1;
    }

    function getPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](numberOfPosts);

        for (uint256 i = 0; i < numberOfPosts; i++) {
            allPosts[i] = posts[i];
        }

        return allPosts;
    }

    function voteCandidate(uint256 _postId, uint256 _candidateId) public {
        Post storage post = posts[_postId];
        require(isActive, "Election has already ended.");
        require(
            !hasVoted[_postId][msg.sender],
            "You have already voted in this post."
        );
        post.votes[_candidateId].push(msg.sender);
        hasVoted[_postId][msg.sender] = true;
    }

    function endElection() public {
        require(checkOnlyAdmin(msg.sender), "Only the owner can end the post.");
        isActive = false;
    }

    function getResultsForSinglePost(
        uint256 _postId
    ) private view returns (uint256[] memory) {
        Post storage post = posts[_postId];
        require(checkOnlyAdmin(msg.sender), "Only admins can extract results");
        address[][] memory votes = post.votes;
        uint256[] memory voteCounts = new uint256[](votes.length);

        for (uint256 i = 0; i < votes.length; i++) {
            voteCounts[i] = votes[i].length;
        }

        return voteCounts;
    }

    function getElectionResults() public view returns (uint256[][] memory) {
        require(!isActive, "Election is still active");
        require(checkOnlyAdmin(msg.sender), "Only admin can extract results.");
        uint256[][] memory allVoteCounts = new uint256[][](numberOfPosts);

        for (uint256 i = 0; i < numberOfPosts; i++) {
            allVoteCounts[i] = getResultsForSinglePost(i);
        }

        return allVoteCounts;
    }
}
