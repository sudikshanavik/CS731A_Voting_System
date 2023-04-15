import React from 'react'
import DeveloperCard from '../components/DeveloperCard';
import { useNavigate } from 'react-router-dom';

export default function ContactUsPageFromCover() {

    const navigate = useNavigate()

    return (
        <div className='coverpage-container'>
            <div className='contactus-container-from-cover'>
                <div className='loginpage-header-container'>
                    <div className='loginpage-title-container' onClick={() => navigate('/', { replace: true })}>Blockchain Voting</div>
                    <div className='loginpage-header-empty-container'></div>
                </div>
                <div className='contactus-from-cover-content-container'>
                    {<DeveloperCard name='Shashank Rapolu' age='20' designation='Student' email='ssrapolu20@iitk.ac.in' />}
                    {<DeveloperCard name='Sudiksha Navik' age='22' designation='Student' email='sudiksha22@iitk.ac.in' />}
                    {<DeveloperCard name='Drashtant Singh Rathod' age='23' designation='Student' email='drashtants22@iitk.ac.in' />}
                </div>
            </div>
        </div>
    )
}                                                                                       