import React, { useState, useEffect } from 'react';
import CandidateCard_forVote from '../components/CandidateCard_forVote';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useStateContext } from '../context';

export default function ViewElectionPage() {

    const [isLoading, setIsLoading] = useState(false)

    const { address, contract, getPosts } = useStateContext()

    const [postData, setPostData] = useState()

    const { state } = useLocation()

    const fetchPost = async () => {
        try {
            let data = await getPosts()
            data = data[state.postId]
            return data
        } catch (err) {
            console.log('Getting an error while fetching post...', err)
        }
    }

    useEffect(() => {
        if (contract) {
            setIsLoading(true)
            fetchPost().then(data => setPostData(data))
            setIsLoading(false)
        }
    }, [address, contract])

    const countVotes = (votes) => {
        let count = 0
        if (votes) {
            for (let i = 0; i < votes.length; i++) {
                count += votes[i].length
            }
        }
        return count
    }

    const toggleLoading = (toLoad) => {
        setIsLoading(toLoad)
    }

    const toggleElectionState = async () => {
        await fetchPost().then(data => setPostData(data))
    }

    if (postData) {
        return (
            <div className='viewelectionpage-container'>
                {isLoading ? <div className='viewelectionpage-loading-container'>
                    <CircularProgress size={30} style={{ color: '#006686' }} />
                </div> :
                    <>
                        <div className='viewelectionpage-header-container'>
                            <div className='viewelectionpage-title-container'>{state.title}</div>
                            {state.isActive ? null : <span className='viewelectionpage-endelection-span'>Election Ended</span>}
                            {/* {state?.isActive ? ((userData.userType === 'Admin' && (electionData?.owner === address || state.owner === address)) ? <button className='viewelectionpage-endelection-button' onClick={handleEndElection}>End Election</button> : null) : electionData ? <span className='viewelectionpage-endelection-span'>Election Ended</span> : null} */}
                        </div>
                        <div className='viewelectionpage-stats-container'>
                            <div className='viewelectionpage-stats-votes-container'>
                                <div className='viewelectionpage-stats-votes-header'>Votes:</div>
                                <div className='viewelectionpage-stats-votes-content'>{state.isActive ? <span>-</span> : countVotes(postData?.votes)}</div>
                            </div>
                            <div className='viewelectionpage-stats-candidates-container'>
                                <div className='viewelectionpage-stats-candidates-header'>Candidates:</div>
                                <div className='viewelectionpage-stats-candidates-content'>{state.candidates.length}</div>
                            </div>
                        </div>
                        <div className='viewelectionpage-description-container'>
                            <span className='viewelectionpage-description-header'>Description:</span>
                            <div className='viewelectionpage-description-content'>
                                {state.description}
                            </div>
                        </div>
                        <div className='viewelectionpage-candidates-container'>
                            <div className='viewelectionpage-candidates-header'>Candidates</div>
                            <div className='viewelectionpage-candidates-list'>
                                {state.candidates.map(candidate => <CandidateCard_forVote key={candidate[0]} toggleLoading={toggleLoading} toggleElectionState={toggleElectionState} postId={state?.postId} isElectionActive={state?.isActive} votes={postData?.votes} candidateId={candidate[0]} photo={candidate[1]} name={candidate[2]} age={candidate[3]} designation={candidate[4]} email={candidate[5]} manifesto={candidate[6]} />)}
                            </div>
                        </div>
                    </>}
            </div>
        )
    } else {
        return (
            <div className='viewelectionpage-container'>
                <div className='viewelectionpage-loading-container'>
                    <CircularProgress size={30} style={{ color: '#006686' }} />
                </div>
            </div>
        )
    }
}