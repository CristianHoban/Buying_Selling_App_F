import React, { useState , useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext'; 
import './Login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                navigate('/mainPage'); // Ensure the response data actually indicates success
            }
        } catch (error) {
            setError('Invalid email or password');
            console.error(error);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Function to navigate to the Register page
    };

    return (
        <div>
        <h1>MarketPlace</h1>
        <h2>Buy and sell everything online!</h2> {/* Title at the top of the page */}
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
        </div>
        </div>
    );
};

export default Login;
