import React from 'react';
import DeveloperCard from '../components/DeveloperCard';

export default function ContactUsPage() {
    return (
        <div className='contactus-root-container'>
            <div className='contactus-container'>
                {<DeveloperCard name='Shashank Rapolu' age='20' designation='Student' email='ssrapolu20@iitk.ac.in' />}
                {<DeveloperCard name='Sudiksha Navik' age='22' designation='Student' email='sudiksha22@iitk.ac.in' />}
                {<DeveloperCard name='Drashtant Singh Rathod' age='23' designation='Student' email='drashtants22@iitk.ac.in' />}
            </div>
        </div>
    )
}