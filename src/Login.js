import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [showAdminBox, setShowAdminBox] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.get(`http://localhost:8082/api/users/login`, {
                params: {
                    email: email,
                    password: password,
                },
            });

            if (response.data) {
                setUser(response.data);
                navigate('/mainPage');
            }
        } catch (error) {
            setError('Invalid email or password');
            console.error(error);
        }
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (adminPassword === "ADMIN") {
            navigate('/adminPage'); // Navigate to Admin page
        } else {
            setError("Invalid Admin Password");
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div>
            <h1>MarketPlace</h1>
            <h2>Buy and sell everything online!</h2>
            <div className="login-container">
                <h2>Please sign in to continue</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin}>
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
                    <button className='loginButton' type="submit">Login</button>
                    <p>Don't you have an account?</p>
                    <button className='loginButton' onClick={handleRegisterRedirect}>Register now</button>
                </form>
                <button className='loginButton' style={{ position: 'absolute', top: 20, right: 20 }} onClick={() => setShowAdminBox(true)}>Admin</button>
                {showAdminBox && (
                    <div style={{ position: 'absolute', top: 50, right: 20, background: 'white', padding: 20, border: '1px solid black' }}>
                        <form onSubmit={handleAdminLogin}>
                            <label>Admin Password:</label>
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                required
                            />
                            <button className='loginButton' type="submit">Submit</button>
                            <button className='loginButton' onClick={() => setShowAdminBox(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
