import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useStateContext } from '../context/index';
import ElectionCard from '../components/ElectionCard'
import { CircularProgress } from '@mui/material';

export default function NoElectionPage() {

    const [posts, setPosts] = useState()
    const [isElectionActive, setIsElectionActive] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const { address, contract, getPosts, endElection } = useStateContext()

    const { userData, toggleEndedElection } = useOutletContext()
    const navigate = useNavigate()

    const fetchPosts = async () => {
        const data = await getPosts()
        return data
    }

    const toggleNoElectionPageState = async () => {
        const data = await fetchPosts()
        setPosts(data)
    }

    const checkIfAdmin = async () => {
        const admins = await contract.methods.getAdmins().call()
        if (admins.includes(address)) return true
        return false
    }

    const handleEndElection = async () => {
        if (!address) {
            alert('Connect to your wallet first.')
        } else {
            try {
                setIsLoading(true)
                await endElection()
                await toggleEndedElection()
                fetchPosts().then(data => setPosts(data))
                contract.methods.isActive().call().then(res => setIsElectionActive(res))
                setIsLoading(false)
            } catch (err) {
                console.log('Unable to end election.', err)
            }
        }
    }

    useEffect(() => {
        if (contract) {
            fetchPosts().then(data => setPosts(data))
            contract.methods.isActive().call().then(res => setIsElectionActive(res))
        }
    }, [address, contract])

    const handleClick = () => {
        navigate('createNewElection')
    }

    if (isLoading) {
        return (
            <div className='noelectionpage-loading-container'>
                <CircularProgress size={30} style={{ color: 'white' }} />
                <span>{userData ? 'Contract might not be connected if it is taking longer than usual. Please come back again later.' : 'Retrieving your user data...'}</span>
            </div>
        )
    } else if (userData.email && posts) {
        if (posts.length == 0) {
            return (
                <div className='no-election-container'>
                    <span className='no-election-top-text'>
                        Currently there is no ongoing election.
                    </span>
                    {userData.userType == 'Admin' && checkIfAdmin(address) && isElectionActive ? <button className='fa fa-plus' id='noelectionpage-addelection-button' onClick={handleClick}></button> : null}
                    {userData.userType == 'Admin' && checkIfAdmin(address) && isElectionActive ? <span className='no-election-bottom-text'>Create a new Post</span> : null}
                </div>
            )
        } else {
            return (
                <div className='parent-yes-election-container'>
                    <div className='yes-election-container'>
                        {posts.map(post => <ElectionCard key={post.postId} toggleNoElectionPageState={toggleNoElectionPageState} postId={post.postId} title={post.title} description={post.description} candidates={post.candidates} votes={post.votes} isActive={isElectionActive} />)}
                    </div>
                    {userData.userType == 'Admin' && checkIfAdmin(address) && isElectionActive ? <button className='fa fa-plus' id='yeselectionpage-addelection-button' onClick={handleClick}></button> : null}
                    {userData.userType == 'Admin' && checkIfAdmin(address) && isElectionActive ? <button className='noelectionpage-endelection-button' onClick={handleEndElection}>End Election</button> : null}
                </div>
            )
        }
    } else {
        return (
            <div className='noelectionpage-loading-container'>
                <CircularProgress size={30} style={{ color: 'white' }} />
                <span>{userData ? 'Contract might not be connected if it is taking longer than usual. Please come back again later.' : 'Retrieving your user data...'}</span>
            </div>
        )
    }
}