import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

export default function CandidateCard_postEntry(props) {
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
            <div className='candidate-card-footer-container-postentry'>
                <div className='postentry-manifesto-container'>
                    <a href={props.manifesto} target='_blank' className='postentry-manifesto-text'>Manifesto</a>
                    <FontAwesomeIcon className='postentry-manifesto-icon' icon={faFile} />
                </div>
            </div>
        </div>
    )
}