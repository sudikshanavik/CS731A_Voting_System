import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { doc, getDoc } from 'firebase/firestore';
import { useStateContext } from '../context';

export default function HomePageLayout() {

    const location = useLocation()
    const currentRoute = location.pathname

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        name: null,
        age: null,
        email: null,
        designation: null,
        userType: null,
    })
    const [isElectionEnded, setIsElectionEnded] = useState()

    console.log('Is election ended? ', isElectionEnded)

    const { address, connectWalletClick, contract } = useStateContext()

    const selectedItemStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.22)',
        padding: '10px 0px',
        display: 'flex',
        gap: '10px',
        border: 'none',
        borderRadius: '5px',
        textDecoration: 'none'
    }

    const unSelectedItemStyle = {
        padding: '10px 0px',
        display: 'flex',
        gap: '10px',
        border: 'none',
        borderRadius: '5px',
        textDecoration: 'none'
    }

    const getUserDetails = async () => {
        const docRef = doc(db, 'users', auth?.currentUser?.uid)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    }

    const fetchElectionStatus = async () => {
        try {
            const res = await contract.methods.isActive().call()
            return res
        } catch (err) {
            console.error('Unable to fetch election status.', err)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const data = await getUserDetails();
                setUserData({
                    name: data.name,
                    age: data.age,
                    email: data.email,
                    designation: data.designation,
                    userType: data.user_type,
                });
            } else {
                setUserData({
                    name: null,
                    age: null,
                    email: null,
                    designation: null,
                    userType: null,
                });
            }
        });
        fetchElectionStatus().then(res => setIsElectionEnded(!res))
        return () => {
            unsubscribe();
        };
    }, []);

    const logOut = async () => {
        try {
            setLoading(true)
            if (address) await connectWalletClick()
            await signOut(auth)
            setLoading(false)
            navigate('/', { replace: true })
        } catch (err) {
            setLoading(false)
            console.error(err)
        }
    }

    function getTitleFromRoute(path) {
        if (path == '/home') {
            return 'Posts'
        } else if (path == '/home/createNewElection') {
            return 'Create New Post'
        } else if (path.includes('/home/viewElection')) {
            return 'View Post'
        } else if (path == '/home/myprofile') {
            return 'My Voter Card'
        } else if (path == '/home/contactUs') {
            return 'Developer Information'
        } else if (path == '/home/about') {
            return 'About Us'
        }
    }

    const toggleEndedElection = async () => {
        try {
            const res = await contract.methods.isActive().call()
            setIsElectionEnded(!res)
        } catch (err) {
            console.error('Some error occurred in HomePageLayout.jsx', err)
        }
    }

    return (
        loading ? <LoadingPage /> :
            (<div className='homepage-container'>
                <div className='homepage-sidebar-container'>
                    <div className='menuicon-container'>
                        <div className='fa fa-bars' id='menu-icon'></div>
                    </div>
                    <NavLink className='sidebar-item-container' to='/home' end style={({ isActive }) => isActive ? selectedItemStyle : unSelectedItemStyle}>
                        <div className='fa fa-th-large' id='dashboard-icon'></div>
                        <span className='dashboard-text'>Dashboard</span>
                    </NavLink>
                    <NavLink className='sidebar-item-container' to='/home/myprofile' style={({ isActive }) => isActive ? selectedItemStyle : unSelectedItemStyle}>
                        <div className='fa fa-user-circle-o' id='myprofile-icon'></div>
                        <span className='myprofile-text'>My Profile</span>
                    </NavLink>
                    <NavLink className='sidebar-item-container' to='/home/contactUs' style={({ isActive }) => isActive ? selectedItemStyle : unSelectedItemStyle}>
                        <div className='fa fa-phone' id='contactus-icon'></div>
                        <span className='contactus-text'>Contact Us</span>
                    </NavLink>
                    <NavLink className='sidebar-item-container' to='/home/about' style={({ isActive }) => isActive ? selectedItemStyle : unSelectedItemStyle}>
                        <span className='about-text'>About</span>
                    </NavLink>
                    <div className='homepage-sidebar-empty-container'></div>
                    <div className='sidebar-signout-button' onClick={logOut}>
                        <div className='fa fa-sign-out' id='signout-icon'></div>
                        <span className='signout-text'>Sign Out</span>
                    </div>
                </div>
                <div className='homepage-not-sidebar-container'>
                    <div className='homepage-header-container'>
                        <div className='homepage-header-title-container'>{`${getTitleFromRoute(currentRoute)} ${isElectionEnded ? ' (Election Ended)' : ''}`}</div>
                        <div className='homepage-header-empty-container'></div>
                        <button className='connect-wallet-button' onClick={connectWalletClick} style={address ? { backgroundColor: '#20a326' } : { border: 'none' }}>{address ? 'Connected' : 'Connect Wallet'}</button>
                        <div className='homepage-usertype-container' style={userData.userType == 'Admin' ? { color: '#F5C723' } : { color: 'white' }}>{userData.userType}</div>
                    </div>
                    <div className='homepage-content-container'>
                        <Outlet context={{ userData, toggleEndedElection }} />
                    </div>
                </div>
            </div>)
    )
}