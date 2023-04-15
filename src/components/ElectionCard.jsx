import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';

export default function ElectionCard(props) {

    const navigate = useNavigate()

    const { address } = useStateContext()

    const getVoteCount = (votes) => {
        let count = 0;
        for (let i = 0; i < votes.length; i++) {
            count += votes[i].length
        }
        return count
    }

    const checkIfVoted = (votes) => {
        for (let i = 0; i < votes.length; i++) {
            if (votes[i].includes(address)) return true
        }
        return false
    }

    const handleClick = () => {
        navigate("viewElection/" + props.postId.toString(), { state: { postId: props.postId, title: props.title, description: props.description, candidates: props.candidates, votes: props.votes, isActive: props.isActive } })
    }

    return (
        <div className='electioncard-container' onClick={handleClick}>
            <div className='electioncard-titlebox-container'>
                {props.title}
            </div>
            <div className='electioncard-prefooter-container'>
                <div className='electioncard-participants-container'>
                    <span className='electioncard-participants-title'>Candidates:</span>
                    <span className='electioncard-participants-content'>{props.candidates.length}</span>
                </div>
                <div className='electioncard-endsin-container'>
                    <span className='electioncard-endsin-title' style={checkIfVoted(props.votes) ? { color: '#26C82D' } : { color: '#CC2727' }}>{checkIfVoted(props.votes) ? 'Voted' : 'Not Voted'}</span>
                </div>
            </div>
            <div className='electioncard-footer-container'>
                <div className='electioncard-votecount-container'>
                    <span className='electioncard-votecount-title'>Vote count:</span>
                    <span className='electioncard-votecount-content'>{getVoteCount(props.votes)}</span>
                </div>
                <span className='electioncard-description-text'>Click to see description</span>
            </div>
        </div>
    )
}