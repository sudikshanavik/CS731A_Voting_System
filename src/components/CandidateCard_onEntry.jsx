import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFileArrowUp, faFile } from '@fortawesome/free-solid-svg-icons';

export default function CandidateCardOnEntry(props) {

    const [candidateData, setCandidateData] = useState({
        photo: null,
        name: null,
        age: null,
        designation: null,
        email: null,
        manifesto: null
    })

    async function handleImageUpload(event) {
        if (event.target.files && event.target.files.length == 1) {
            const file = event.target.files[0]

            if (file.type.startsWith('image/')) {
                try {
                    setCandidateData(prev => ({
                        ...prev,
                        photo: file
                    }))
                } catch (err) {
                    console.error('Unable to set image data.', err)
                }
            } else {
                alert('Please upload an image file')
            }
        }
    }

    function handlePDFUpload(event) {
        if (event.target.files && event.target.files.length == 1) {
            const file = event.target.files[0]

            if (file.type.startsWith('application/pdf')) {
                setCandidateData(prev => ({
                    ...prev,
                    manifesto: file
                }))
            } else {
                alert('Please upload a pdf file')
            }
        }
    }

    function handleChange(event) {
        setCandidateData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className='candidate-card-onentry-container'>
            <div className='candidate-onentry-photo-container'>
                <div className='candidate-onentry-photo-circle'>
                    {candidateData.photo == null ? <input className='candidate-card-fileinput' type='file' accept='image/*' onChange={handleImageUpload} /> : null}
                    {candidateData.photo == null ? <FontAwesomeIcon id='candidate-photo-upload-icon' icon={faUpload} /> : <img src={URL.createObjectURL(candidateData.photo)} />}
                </div>
            </div>
            <div className='candidate-details-container'>
                <div className='candidate-details-name-container'>
                    <label className='candidate-details-name-label' for='name'>Name:</label>
                    <input className='candidate-details-name-input' id='name' name='name' type='text' placeholder='Enter name' onChange={handleChange} />
                </div>
                <div className='candidate-details-age-container'>
                    <label className='candidate-details-age-label' for='age'>Age:</label>
                    <input className='candidate-details-age-input' id='age' name='age' type='number' min='0' max='100' placeholder='age' onChange={handleChange} />
                </div>
                <div className='candidate-details-designation-container'>
                    <label className='candidate-details-designation-label' for='designation'>Job:</label>
                    <input className='candidate-details-designation-input' id='designation' name='designation' type='text' placeholder='designation' onChange={handleChange} />
                </div>
                <div className='candidate-details-email-container'>
                    <label className='candidate-details-email-label' for='email'>Email:</label>
                    <input className='candidate-details-email-input' id='email' name='email' type='email' placeholder='email' onChange={handleChange} />
                </div>
            </div>
            <div className='candidate-card-footer-container'>
                <div className='upload-manifesto-container'>
                    {candidateData.manifesto == null ? <input className='upload-manifesto-fileinput' type='file' accept='application/pdf' onChange={handlePDFUpload} /> : null}
                    {candidateData.manifesto == null ? <span className='upload-manifesto-text'>Upload Manifesto</span> : <a className='postentry-manifesto-text' target='_blank' href={URL.createObjectURL(candidateData.manifesto)}>Manifesto</a>}
                    {candidateData.manifesto == null ? <FontAwesomeIcon className='upload-manifesto-icon' icon={faFileArrowUp} /> : <FontAwesomeIcon className='postentry-manifesto-icon' icon={faFile} />}
                </div>
                <button className='add-candidate-button' onClick={() => props.handleAddCandidate(candidateData)}>Add</button>
            </div>
        </div>
    )
}