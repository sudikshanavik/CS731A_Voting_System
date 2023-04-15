import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SignUpPageII() {

    const [signUpDetails2, setSignUpDetails2] = useState({
        name: null,
        age: null,
        designation: null,
        userType: 'Voter',
    })
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const navigateToAboutPage = () => {
        navigate('/about')
    }

    const navigateToContactUsPage = () => {
        navigate('/contactUs')
    }

    function handleChange(event) {
        setErrorMessage('')
        setSignUpDetails2(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    async function sendVerificationEmail() {
        try {
            console.log(await sendEmailVerification(auth.currentUser));
            console.log("Email verification link sent!");
        } catch (error) {
            console.error("Error sending email verification:", error);
        }
    }


    const signUp = async () => {
        if (signUpDetails2.name == null || signUpDetails2.age == null || signUpDetails2.designation == null || signUpDetails2.userType == null) {
            setErrorMessage('Enter complete details')
        }
        else if (signUpDetails2.name.length > 25) {
            setErrorMessage('Please reduce your name to < 25 characters')
        } else if (signUpDetails2.age < 17 || setSignUpDetails2.age > 100) {
            setErrorMessage('Age must be between 17-100')
        } else {
            try {
                setErrorMessage('')
                setLoading(true)
                await createUserWithEmailAndPassword(auth, location.state?.email, location.state?.password)
                await sendVerificationEmail()
                const data = {
                    name: signUpDetails2.name,
                    age: signUpDetails2.age,
                    email: location.state?.email,
                    designation: signUpDetails2.designation,
                    user_uid: auth?.currentUser?.uid,
                    user_type: signUpDetails2.userType,
                };
                await setDoc(doc(db, 'users', auth?.currentUser?.uid), data);
                setErrorMessage('')
                setLoading(false)
                navigate('/login', { replace: true })
            } catch (err) {
                setLoading(false)
                setErrorMessage('Please try again and check your internet connection.')
                console.error(err)
            }
        }
    }

    return (
        <div className='signuppage-container'>
            <div className='signuppage-header-container'>
                <div className='signuppage-title-container' onClick={() => navigate('/', { replace: true })}>Blockchain Voting</div>
                <div className='signuppage-header-empty-container'></div>
                <div className='signuppage-about-container' onClick={navigateToAboutPage}>About</div>
                <div className='signuppage-contactus-container' onClick={navigateToContactUsPage}>Contact Us</div>
            </div>
            <div className='signuppage-not-header-container'>
                <div className='signuppage-maincontent-container'>
                    <div className='signupbox'>
                        <span className='signup-title'>Sign Up</span>
                        <div className='signup-inputs-container'>
                            <input className='signup-inputbox' placeholder='Name' name='name' type='text' onChange={handleChange} value={signUpDetails2.name} disabled={loading} />
                            <input className='signup-inputbox' placeholder='Age' name='age' type='number' min='17' max='100' onChange={handleChange} value={signUpDetails2.age} disabled={loading} />
                            <input className='signup-inputbox' placeholder='Designation' name='designation' type='text' onChange={handleChange} value={signUpDetails2.designation} disabled={loading} />
                            {/* <select className='signup-select' onChange={handleSelect} disabled={loading}>
                            <option className='signup-select-option' value='Voter' selected>Voter</option>
                            <option className='signup-select-option' value='Admin'>Admin</option>
                        </select> */}
                        </div>
                        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> :
                            <button className='signuppage-signupbutton' onClick={signUp}>
                                Sign up
                            </button>}
                    </div>
                    <div className='loginpage-goto-signup-container'>
                        <span className='loginpage-go-to-signup-span' onClick={() => navigate('/login')}>Go to Login</span>
                        <ArrowForwardIcon style={{ fontSize: '20px' }} />
                    </div>
                </div>
                <p className='signup-error-paragraph'>{errorMessage}</p>
            </div>
        </div>
    )
}