import React, { useState, createContext, useContext } from 'react'
import Web3 from 'web3'
import ElectionSystemJSON from '../build/contracts/ElectionSystem.json'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {

    const [address, setAddress] = useState(null)

    const web3 = new Web3('http://localhost:7545')
    const contractABI = ElectionSystemJSON.abi
    const contractAddress = '0xe5fC0b867B781a7611C90063c14131ed6ce3526c'
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

    const connectWalletClick = async () => {
        if (address) {
            setAddress(null)
        } else {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum)
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' })
                    const accounts = await web3.eth.getAccounts();

                    if (accounts.length > 0) {
                        setAddress(accounts[0])
                    }
                } catch (err) {
                    console.error('Unable to connect wallet.', err)
                }
            } else {
                alert('Please install MetaMask!')
            }
        }
    }

    const convertCandidateDataToList = (candidateData, imageURLs, pdfURLs) => {
        let candidateArray = []
        for (let i = 0; i < candidateData.length; i++) {
            candidateArray.push([
                imageURLs[i],
                candidateData[i].name,
                candidateData[i].age.toString(),
                candidateData[i].designation,
                candidateData[i].email,
                pdfURLs[i]
            ])
        }
        return candidateArray
    }

    const convertCandidatesListFromContract = (candidateList) => {
        let changed = []
        for (let i = 0; i < candidateList.length; i++) {
            changed.push([parseInt(candidateList[i][0].toString()), candidateList[i][1], candidateList[i][2], parseInt(candidateList[i][3]), candidateList[i][4], candidateList[i][5], candidateList[i][6]])
        }
        return changed
    }

    const publishPost = async (postData, imageURLs, pdfURLs) => {
        try {
            const candidateArray = convertCandidateDataToList(postData.candidates, imageURLs, pdfURLs)
            const gas = await contractInstance.methods.createPost(postData.title, postData.description, candidateArray)
                .estimateGas({ from: address });
            const gasWithBuffer = Math.ceil(gas * 1.2);
            await contractInstance.methods.createPost(postData.title, postData.description, candidateArray).send({ from: address, gas: gasWithBuffer })
                .on('transactionHash', (hash) => {
                    console.log("Transaction hash: ", hash);
                })
                .on('receipt', (receipt) => {
                    console.log("Transaction receipt: ", receipt);
                })
                .on('confirmation', (confirmationNumber) => {
                    console.log("Confirmation number: ", confirmationNumber);
                })
            console.log('Successfully created a new post!')
        } catch (err) {
            console.error('Unable to create a post.', err);
        }
    }

    const getPosts = async () => {
        try {
            const posts = await contractInstance.methods.getPosts().call()
            const parsedPosts = posts.map((post) => ({
                postId: parseInt(post.id.toString()),
                title: post.title,
                description: post.description,
                candidates: convertCandidatesListFromContract(post.candidates),
                votes: post.votes,
            }))
            return parsedPosts
        } catch (err) {
            console.error('Unable to call .getPosts', err)
        }
    }

    const voteCandidate = async (postId, candidateId) => {
        try {
            const gas = await contractInstance.methods.voteCandidate(postId, candidateId).estimateGas({ from: address });
            const gasWithBuffer = Math.ceil(gas * 1.2);
            await contractInstance.methods.voteCandidate(postId, candidateId).send({ from: address, gas: gasWithBuffer })
                .on('transactionHash', (hash) => {
                    console.log("Transaction hash: ", hash);
                })
                .on('receipt', (receipt) => {
                    console.log("Transaction receipt: ", receipt);
                })
                .on('confirmation', (confirmationNumber) => {
                    console.log("Confirmation number: ", confirmationNumber);
                })
            console.log('Sucssfully voted!')
        } catch (err) {
            console.error('Failed to vote for candidate.', err)
        }
    }

    const endElection = async () => {
        try {
            const gas = await contractInstance.methods.endElection().estimateGas({ from: address });
            const gasWithBuffer = Math.ceil(gas * 1.2);
            await contractInstance.methods.endElection().send({ from: address, gas: gasWithBuffer })
                .on('transactionHash', (hash) => {
                    console.log("Transaction hash: ", hash);
                })
                .on('receipt', (receipt) => {
                    console.log("Transaction receipt: ", receipt);
                })
                .on('confirmation', (confirmationNumber) => {
                    console.log("Confirmation number: ", confirmationNumber);
                })
            console.log('Successfully ended election.')
        } catch (err) {
            console.error('Unable to end election.', err)
        }
    }

    const getElectionResults = async () => {
        try {
            const results = await contractInstance.methods.getElectionResults().call()
            return results
        } catch (err) {
            console.error('Unable to fetch results.', err)
        }
    }

    return (
        <StateContext.Provider value={{
            address,
            contract: contractInstance,
            connectWalletClick,
            createPost: publishPost,
            getPosts,
            voteCandidate,
            endElection,
            getElectionResults,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)