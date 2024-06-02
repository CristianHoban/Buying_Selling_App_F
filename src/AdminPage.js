import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';  // Ensure this points to the correct CSS file
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/users/findall');
            setUsers(response.data);
        } catch (error) {
            setError('Failed to fetch users');
            console.error(error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8082/api/users/delete/${userId}`);
            fetchUsers();  // Refresh the list after deleting
        } catch (error) {
            setError('Failed to delete user');
            console.error(error);
        }
    };

    const handleUpdateBalance = async (userId) => {
        const newBalance = prompt("Enter new balance:");
        if (newBalance) {
            try {
                await axios.put(`http://localhost:8082/api/users/updateBalance/${userId}/${newBalance}`,);
                fetchUsers();  // Refresh the list after updating
            } catch (error) {
                setError('Failed to update balance');
                console.error(error);
            }
        }
    };

    return (
        <div style={mainContainerStyle}>
            <button className="profileButton" style={{ position: 'absolute', top: 20, left: 20 }} onClick={() => navigate('/login')}>Logout</button>
            <h1>Admin</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {users.map(user => (
                <div key={user.id} className="user-box">
                    <p><strong>First name:</strong> {user.firstName}</p>
                    <p><strong>Last name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Balance:</strong> {user.balance} lei</p>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                    <button onClick={() => handleUpdateBalance(user.id)}>+/- Balance</button>
                </div>
            ))}
        </div>
    );
};

// Use a similar style to MainPage for layout consistency
const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
    maxHeight: '100vh',
    paddingTop: '20px',
    width: '100%',
    margin: '0 auto',
    scrollbarWidth: 'none',  // Firefox
    '::-webkit-scrollbar': {
        display: 'none'  // Chrome, Safari, Opera
    }
};

export default AdminPage;
