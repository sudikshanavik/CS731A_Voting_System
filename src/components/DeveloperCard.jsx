import React from 'react';

export default function DeveloperCard(props) {
    return (
        <div className='developer-card-container'>
            <div className='developer-badge-container'>
                <span class="material-symbols-outlined" id='developer-badge-icon'>person</span>
            </div>
            <div className='developer-details-container'>
                <div className='developer-details-name-container'>
                    <span className='developer-details-name-title'>Name:</span>
                    <span className='developer-details-name-content'>{props.name}</span>
                </div>
                <div className='developer-details-age-container'>
                    <span className='developer-details-age-title'>Age:</span>
                    <span className='developer-details-age-content'>{props.age}</span>
                </div>
                <div className='developer-details-designation-container'>
                    <span className='developer-details-designation-title'>Job:</span>
                    <span className='developer-details-designation-content'>{props.designation}</span>
                </div>
                <div className='developer-details-email-container'>
                    <span className='developer-details-email-title'>Email:</span>
                    <span className='developer-details-email-content'>{props.email}</span>
                </div>
            </div>
            <div className='developer-card-footer-container'>
                <span className='developer-card-label'>Developer</span>
            </div>
        </div>
    )
}