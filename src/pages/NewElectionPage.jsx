import React, { useState, useEffect } from 'react';
import CandidateCardOnEntry from '../components/CandidateCard_onEntry';
import CandidateCard_postEntry from '../components/CandidateCard_postEntry';
import { useNavigate } from 'react-router-dom';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useStateContext } from '../context';
import { CircularProgress } from '@mui/material';

export default function NewElectionPage() {

    const [pageData, setPageData] = useState({
        title: null,
        description: null,
        candidates: null
    })
    const [showCandidateCardOnEntry, setShowCandidateCardOnEntry] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!pageData.candidates) {
            setShowCandidateCardOnEntry(true)
        }
    }, [])


    const navigate = useNavigate()

    const { address, createPost } = useStateContext()

    function addParticipantOnClick() {
        if (pageData.candidates) {
            setShowCandidateCardOnEntry(!showCandidateCardOnEntry)
        }
    }

    function cancelOnClick() {
        navigate('/home', { replace: true })
    }

    const uploadImageToStorage = async (imageData) => {
        const fileName = Date.now() + "_" + imageData.name;
        const fileRef = ref(storage, `/candidatePhotos/${fileName}`)
        try {
            const uploadResult = await uploadBytes(fileRef, imageData)
            const fileURL = await getDownloadURL(uploadResult.ref)
            return fileURL
        } catch (err) {
            console.error('Unable to upload image to firestore.', err)
        }
    }

    const uploadPDFToStorage = async (pdfData) => {
        const fileName = Date.now() + "-" + pdfData.name;
        const fileRef = ref(storage, `/candidateManifestos/${fileName}`)
        try {
            const uploadResult = await uploadBytes(fileRef, pdfData)
            const fileURL = await getDownloadURL(uploadResult.ref)
            return fileURL
        } catch (err) {
            console.error('Unable to upload pdf to firebase.', err)
        }
    }

    const deployOnClick = async () => {
        if (pageData.title == null || pageData.description == null || pageData.candidates == null) {
            alert('Please input all the fields.')
        } else if (!address) {
            alert('Connect your wallet first.')
        } else {
            try {
                setIsLoading(true)
                let imageURLs = []
                let pdfURLs = []
                console.log('Started uploading images and pdfs...')
                for (let i = 0; i < pageData.candidates.length; i++) {
                    imageURLs.push(await uploadImageToStorage(pageData.candidates[i].photo))
                    pdfURLs.push(await uploadPDFToStorage(pageData.candidates[i].manifesto))
                }
                console.log('Finished.')
                console.log('Started creating post...')
                await createPost(pageData, imageURLs, pdfURLs)
                console.log('Finished.')
                setIsLoading(false)
                navigate('/home', { replace: true })
            } catch (err) {
                setIsLoading(false)
                alert('Some error occurred. Please try again.')
            }
        }
    }

    function handleChange(event) {
        setPageData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    function handleAddCandidate(data) {
        console.log(data)
        if (data.photo == null || data.name == null || data.age == null || data.designation == null || data.email == null || data.manifesto == null) {
            alert('Insert all the fields')
        } else if (!data.email.includes('@iitk.ac.in')) {
            alert("Email should be in '@iitk.ac.in' format.")
        }
        else {
            setPageData(prev => ({
                ...prev,
                candidates: prev.candidates == null ? [data] : [data, ...prev.candidates]
            }))
            setShowCandidateCardOnEntry(false)
        }
    }

    return (
        <div className='newelectionpage-container'>
            <div className='newelectionpage-election-title-container'>
                <div className='newelectionpage-title-header-container'>Post Title:</div>
                <input className='newelectionpage-title-input' name='title' value={pageData.title} onChange={handleChange} disabled={isLoading} />
            </div>
            <div className='newelectionpage-election-description-container'>
                <div className='newelectionpage-description-header-container'>Post description:</div>
                <textarea className='newelectionpage-description-input' rows='4' name='description' value={pageData.description} onChange={handleChange} disabled={isLoading}></textarea>
            </div>
            <div className='newelectionpage-candidates-container'>
                <div className='newelectionpage-candidates-header-container'>
                    <span className='newelectionpage-candidates-title'>Candidates:</span>
                    <button className='newelectionpage-addparticipant-button' onClick={addParticipantOnClick} disabled={isLoading} style={isLoading ? { color: 'rgba(255, 255, 255, 0.783)', backgroundColor: '#24738f' } : { color: 'white' }}>
                        <span className='newelectionpage-addparticipant-text'>Add Participants</span>
                        <span className='fa fa-plus' id='newelectionpage-addparticipant-icon'></span>
                    </button>
                </div>
                <div className='newelectionpage-candidateslist-container'>
                    {showCandidateCardOnEntry ? <CandidateCardOnEntry handleAddCandidate={handleAddCandidate} /> : null}
                    {pageData.candidates != null ? pageData.candidates.map((item) => <CandidateCard_postEntry key={item.email} photo={URL.createObjectURL(item.photo)} name={item.name} age={item.age} designation={item.designation} email={item.email} manifesto={URL.createObjectURL(item.manifesto)} />) : null}
                </div>
            </div>
            <div className='newelectionpage-footer-container'>
                <button className='newelectionpage-cancel-button' onClick={cancelOnClick} disabled={isLoading} style={isLoading ? { color: 'rgba(255, 255, 255, 0.783)', backgroundColor: '#b32222' } : { color: 'white' }}>Cancel</button>
                <button className='newelectionpage-deploy-button' onClick={deployOnClick} disabled={isLoading} style={isLoading ? { color: 'white', backgroundColor: '#20a326' } : { color: 'white' }}>{isLoading ? <CircularProgress size={17} style={{ color: 'white' }} /> : 'Deploy'}</button>
            </div>
        </div>
    )
}