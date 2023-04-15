import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '../context';

export default function CandidateCard_forVote(props) {

    const { address, voteCandidate } = useStateContext()

    const voteButtonOnClick = async () => {
        if (!address) {
            alert('Connect your wallet first!')
        } else {
            props.toggleLoading(true)
            await voteCandidate(props.postId, props.candidateId)
            await props.toggleElectionState()
            props.toggleLoading(false)
        }
    }

    const checkCandidateVote = () => {
        for (let i = 0; i < props.votes.length; i++) {
            if (props.votes[i].includes(address)) return i
        }
        return -1
    }

    const didCandidateWin = () => {
        if (props.votes) {
            const candidateVoteCount = props.votes[props.candidateId].length
            const voteCountForAllCandidates = []
            for (let i = 0; i < props.votes.length; i++) {
                voteCountForAllCandidates.push(props.votes[i].length)
            }
            if (candidateVoteCount == Math.max(...voteCountForAllCandidates)) {
                return true
            } else {
                return false
            }
        }
    }

    return (
        <div className='candidate-card-container-postentry'>
            <div className='candidate-photo-circle-postentry'>
                <img src={props.photo}></img>
            </div>
            <div className='candidate-details-container-postentry'>
                <div className='candidate-details-name-container-postentry'>
                    <label className='candidate-details-name-label-postentry' for='name'>Name:</label>
                    <div className='candidate-details-name-text-postentry'>{props.name}</div>
                </div>
                <div className='candidate-details-age-container-postentry'>
                    <label className='candidate-details-age-label-postentry' for='age'>Age:</label>
                    <div className='candidate-details-age-text-postentry'>{props.age}</div>
                </div>
                <div className='candidate-details-designation-container-postentry'>
                    <label className='candidate-details-designation-label-postentry' for='designation'>Job:</label>
                    <div className='candidate-details-designation-text-postentry'>{props.designation}</div>
                </div>
                <div className='candidate-details-email-container-postentry'>
                    <label className='candidate-details-email-label-postentry' for='email'>Email:</label>
                    <div className='candidate-details-email-text-postentry'>{props.email}</div>
                </div>
            </div>
            <div className='candidate-card-footer-container-forvote'>
                <div className='postentry-manifesto-container'>
                    <a target='_blank' href={props.manifesto} className='postentry-manifesto-text'>Manifesto</a>
                    <FontAwesomeIcon className='postentry-manifesto-icon' icon={faFile} />
                </div>
                {props.isElectionActive ? (checkCandidateVote() == -1 ? <button className='candidate-card-footer-vote-button' onClick={voteButtonOnClick}>Vote</button> : checkCandidateVote() == props.candidateId ? <span className='candidate-card-footer-voted-span'>Voted</span> : null) :
                    (<span className='candidate-card-footer-winner-span'>{didCandidateWin() ? 'Winner' : null} {props.votes ? `(${props.votes[props.candidateId]?.length})` : '()'}</span>)}

            </div>
        </div>
    )
}