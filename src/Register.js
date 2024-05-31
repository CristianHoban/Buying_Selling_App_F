import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8082/api/users/register', {
                firstName,
                lastName,
                email,
                password,
                address,
                balance
            });
            if (response.status === 200) {
                navigate('/login');
            } else {
                setError('Registration failed');
            }
        } catch (error) {
            setError('Email already in use');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <div className="register-container">
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Last name:</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>First name:</label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Balance:</label>
                        <input
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
