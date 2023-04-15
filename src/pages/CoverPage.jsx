import React from "react";
import { useNavigate } from 'react-router-dom';

export default function CoverPage() {

    const navigate = useNavigate()

    const navigateToAboutPage = () => {
        navigate('about')
    }

    const navigateToContactUsPage = () => {
        navigate('contactUs')
    }

    return (
        <div className="coverpage-container">
            <div className="coverpage-header-container">
                <div className="coverpage-about-container" onClick={navigateToAboutPage}>
                    About
                </div>
                <div className="coverpage-contactus-container" onClick={navigateToContactUsPage}> Contact Us</div>
            </div>
            <div className="coverpage-not-header-container">
                <div className="empty-container"></div>
                <div className="coverpage-content-container">
                    <div className="coverpage-title-container">
                        Blockchain Voting
                    </div>
                    <div className="coverpage-description-container">
                        Welcome to our secure and transparent voting platform, built on the power of blockchain technology.
                        Our platform enables voters to cast their ballots with confidence, knowing that their votes are secure and
                        tamper-proof. By utilizing the decentralized nature of blockchain, we ensure that every vote is recorded and
                        validated in a transparent and immutable manner. Our platform provides a seamless and user-friendly experience,
                        allowing voters to easily cast their ballots from anywhere, at any time. Join us in shaping the future of
                        democracy, one vote at a time.
                    </div>
                    <div className="coverpage-buttons-container">
                        <button className="signup-button" onClick={() => navigate('signup')}>
                            Sign up
                        </button>
                        <button className="login-button" onClick={() => navigate('login')}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}