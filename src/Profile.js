import React, { useContext } from 'react';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to my profile!</h1>
            {/* {user ? <p>User ID: {user.id}</p> : <p>No user data available.</p>} */}
            <div >
            <h2>Personal Details</h2>
            <p><b>Last name</b>: {user.lastName}</p>
            <p><b>First name</b>: {user.firstName}</p>
            <p><b>Email</b>: {user.email}</p>
            <p><b>Address</b>: {user.address}</p>
            <p><b>Balance</b>: {user.balance} lei</p>

            
        </div>
        <div className="profile-actions">
        <button onClick={() => navigate('/userOffers')}>See your offers</button>
                <button onClick={() => navigate('/transactions')}>See your transactions</button>
                <button onClick={() => navigate('/addProduct')}>Add a new product for sale</button>
                <button>See your reviews</button>

            </div>
            
        </div>
        
    );
}

export default Profile;