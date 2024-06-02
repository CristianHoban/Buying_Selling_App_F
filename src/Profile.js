import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser
import './Profile.css';

const Profile = () => {
    const { user, setUser } = useUser();
    const [refreshedUser, setRefreshedUser] = useState(user); // New state to hold refreshed user data
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/users/get/${user.id}`);
                if (response.data) {
                    setRefreshedUser(response.data); // Update refreshedUser with latest data
                    setUser(response.data); // Optionally update the context if needed elsewhere
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        if (user && user.id) {
            fetchUserData();
        }
    }, [user.id, setUser]); // Dependency on user.id to re-fetch when it changes

    return (
        <div className="profile-container">
            <h1>Welcome to my profile!</h1>
            <div>
                <h2>Personal Details</h2>
                <p><b>Last name:</b> {refreshedUser.lastName}</p>
                <p><b>First name:</b> {refreshedUser.firstName}</p>
                <p><b>Email:</b> {refreshedUser.email}</p>
                <p><b>Address:</b> {refreshedUser.address}</p>
                <p><b>Balance:</b> {refreshedUser.balance} lei</p>
            </div>
            <div className="profile-actions">
                <button className="profileButton" onClick={() => navigate('/userOffers')}>See your offers</button>
                <button className="profileButton" onClick={() => navigate('/transactions')}>See your transactions</button>
                <button className="profileButton" onClick={() => navigate('/addProduct')}>Add a new product for sale</button>
                <button className="profileButton" onClick={() => navigate('/reviews')}>See your reviews</button>
                <button className="profileButton" onClick={() => navigate('/leaveReview')}>Leave a Review</button>
            </div>
        </div>
    );
}

export default Profile;
