import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SignUpPage() {

    const [signUpDetails, setSignUpDetails] = useState({
        email: null,
        password: null,
        confirmPassword: null
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const navigateToAboutPage = () => {
        navigate('/about')
    }

    const navigateToContactUsPage = () => {
        navigate('/contactUs')
    }

    function handleChange(event) {
        setErrorMessage('')
        setSignUpDetails(prev => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    const clickNext = () => {
        if (!signUpDetails.email.includes('@iitk.ac.in')) {
            setErrorMessage('Invalid email')
        } else if (signUpDetails.password.length < 8) {
            setErrorMessage('Password must be atleast 8 characters')
        } else if (signUpDetails.password != signUpDetails.confirmPassword) {
            setErrorMessage('Passwords do not match')
        } else {
            setLoading(true)
            navigate('/signup2', { replace: true, state: { email: signUpDetails.email, password: signUpDetails.password } })
            setLoading(false)
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
                            <input className='signup-inputbox' name='email' placeholder='Email' type='email' onChange={handleChange} disabled={loading} value={signUpDetails.email} />
                            <input className='signup-inputbox' name='password' placeholder='Password' type='password' onChange={handleChange} disabled={loading} value={signUpDetails.password} />
                            <input className='signup-inputbox' name='confirmPassword' placeholder='Confirm password' type='password' onChange={handleChange} disabled={loading} value={signUpDetails.confirmPassword} />
                        </div>
                        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> :
                            <button className='signuppage-signupbutton' onClick={clickNext}>
                                Next
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