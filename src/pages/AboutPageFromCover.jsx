import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AboutPageFromCover() {

    const navigate = useNavigate()

    return (
        <div className='coverpage-container'>
            <div className='loginpage-header-container'>
                <div className='loginpage-title-container' onClick={() => navigate('/', { replace: true })}>Blockchain Voting</div>
                <div className='loginpage-header-empty-container'></div>
            </div>
            <div className='about-container-from-cover'>
            Welcome to our blockchain-based voting system website! We have created a dedicated system, revolutionizing the way we conduct elections and voting processes. Our platform utilizes cutting-edge blockchain technology to create a secure, transparent, and tamper-proof voting system that ensures the integrity of every vote. By using blockchain, we are able to eliminate the need for a centralized authority to oversee the voting process, providing a decentralized and democratic approach to voting. With our system, voters can cast their ballots from the comfort of their own homes, using a secure digital identity verification process. This eliminates the need for physical polling stations, reduces the risk of fraud, and makes voting more accessible for everyone. Our platform also offers real-time vote counting and tallies, ensuring that the results of the election are available immediately after the voting period has ended. This transparency allows for greater accountability and instills confidence in the electoral process. We are committed to providing a reliable and secure platform for elections of all kinds, from local elections to national elections and even corporate board elections. Our team is constantly working to improve the system and enhance its security features to ensure the highest level of integrity.
            </div>
        </div>
    )
}