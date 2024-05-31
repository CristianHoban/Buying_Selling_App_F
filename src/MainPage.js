import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import UserContext from './UserContext';

const MainPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); // Use navigate for redirection

    return (
        <div>
            <h1>Welcome to the MainPage!</h1>
            <button style={{ position: 'absolute', top: 0, right: 0 }} onClick={() => navigate('/profile')}>
                Go to Profile
            </button>
            {/* Optional: Display user ID or other user info
            {user && <p>User ID: {user.id}</p>} */}
        </div>
    );
}

export default MainPage;
