import { CircularProgress } from '@mui/material';
import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function MyProfilePage() {

    const { userData } = useOutletContext()

    if (userData.email) {
        return (
            <div className='myprofile-root-container'>
                <div className='myprofile-card-container'>
                    <div className='myprofile-badge-container'>
                        <span class="material-symbols-outlined" id='myprofile-badge-icon'>verified_user</span>
                    </div>
                    <div className='myprofile-details-container'>
                        <div className='myprofile-details-name-container'>
                            <span className='myprofile-details-name-title'>Name:</span>
                            <span className='myprofile-details-name-content'>{userData.name}</span>
                        </div>
                        <div className='myprofile-details-age-container'>
                            <span className='myprofile-details-age-title'>Age:</span>
                            <span className='myprofile-details-age-content'>{userData.age}</span>
                        </div>
                        <div className='myprofile-details-designation-container'>
                            <span className='myprofile-details-designation-title'>Job:</span>
                            <span className='myprofile-details-designation-content'>{userData.designation}</span>
                        </div>
                        <div className='myprofile-details-email-container'>
                            <span className='myprofile-details-email-title'>Email:</span>
                            <span className='myprofile-details-email-content'>{userData.email}</span>
                        </div>
                        <div className='myprofile-details-usertype-container'>
                            <span className='myprofile-details-usertype-title'>Usertype:</span>
                            <span className='myprofile-details-usertype-content'>{userData.userType}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div className='myprofile-root-container'>
            <CircularProgress size={30} style={{ color: 'white' }} />
        </div>
    }
}