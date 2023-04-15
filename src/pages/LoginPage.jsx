import React from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function LoginPage() {

    const [loginDetails, setLoginDetails] = useState({
        email: null,
        password: null
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
        setLoginDetails(prev => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    const login = async () => {
        try {
            if (!loginDetails.email.includes('@iitk.ac.in')) {
                setErrorMessage('Enter a valid email')
            } else if (loginDetails.password.length < 8) {
                setErrorMessage('Password must be of atleast 8 characters')
            }
            else {
                setLoading(true)
                await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
                if (auth?.currentUser?.emailVerified) {
                    setLoading(false);
                    navigate('/home', { replace: true });
                } else {
                    setLoading(false);
                    setErrorMessage('Your email has not been verified yet.');
                }
            }
        } catch (err) {
            setLoading(false)
            setErrorMessage('Incorrect email/password or poor internet connection.')
        }
    }

    return (
        <div className='loginpage-container'>
            <div className='loginpage-header-container'>
                <div className='loginpage-title-container' onClick={() => navigate('/', { replace: true })}>Blockchain Voting</div>
                <div className='loginpage-header-empty-container'></div>
                <div className='loginpage-about-container' onClick={navigateToAboutPage}>About</div>
                <div className='loginpage-contactus-container' onClick={navigateToContactUsPage}>Contact Us</div>
            </div>
            <div className='loginpage-not-header-container'>
                <div className='loginpage-maincontent-container'>
                    <div className='loginbox'>
                        <span className='login-title'>Login</span>
                        <div className='login-inputs-container'>
                            <input className='login-inputbox' name='email' placeholder='Email' type='email' onChange={handleChange} disabled={loading} />
                            <input className='login-inputbox' name='password' placeholder='Password' type='password' onChange={handleChange} disabled={loading} />
                        </div>
                        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> :
                            <button className='loginpage-loginbutton' onClick={login}>
                                Login
                            </button>}
                    </div>
                    <div className='loginpage-goto-signup-container'>
                        <span className='loginpage-go-to-signup-span' onClick={() => navigate('/signup')}>Go to Sign Up</span>
                        <ArrowForwardIcon style={{ fontSize: '20px' }} />
                    </div>
                </div>
                <p className='login-error-paragraph'>{errorMessage}</p>
            </div>
        </div>
    )
}