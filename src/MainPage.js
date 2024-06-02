import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext, { useUser } from './UserContext'; // Import useUser
import './Login.css'; // Ensure this is correctly pointing to where your Login.css is located

const MainPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState({});
    const [activeProductId, setActiveProductId] = useState(null);
    const { user, setUser } = useUser();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8082/api/products/available/${user.id}`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products:', error));
        }
    }, [user]);

    const mainContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 150px)', // Ensure the container does not overlap with fixed headers
        width: '100%', // Centralize and expand the main container
        margin: '0 auto', // Center the container horizontally
        paddingTop: '60px', // Space from top bar
        scrollbarWidth: 'none', // Firefox
    '::-webkit-scrollbar': {
        display: 'none' // Chrome, Safari, Opera
    }
    };

    const productBoxStyle = {
        background: 'rgba(255, 255, 255, 0.9)', // Slightly more opacity for better readability
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        margin: '20px',
        width: '400px', // Make product boxes take full width of the main container
        boxSizing: 'border-box', // Include padding in the width calculation
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)' // Soft shadow for better visibility
    };

    const bottomBarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        zIndex: 1000,
    };

    const fetchReviews = (productId, sellerId) => {
        if (activeProductId === productId) {
            setActiveProductId(null);
        } else {
            fetch(`http://localhost:8082/api/reviews/getByUserId/${sellerId}`)
                .then(response => response.json())
                .then(data => {
                    setReviews(prev => ({ ...prev, [sellerId]: data }));
                    setActiveProductId(productId);
                })
                .catch(error => console.error('Error fetching reviews:', error));
            }};
            const reviewBoxStyle = {
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '10px',
                margin: '5px 0',
                background: 'rgba(153, 194, 255, 0.3)', // Slightly grey background for differentiation
            };

            const handleBuyProduct = (product) => {
                const userHasEnoughMoney = user.balance >= product.price;
                if (!userHasEnoughMoney) {
                    alert("You do not have enough money to buy this product.");
                    return;
                }
                const confirmPurchase = window.confirm("Are you sure you want to buy this product?");
                if (confirmPurchase) {
                    fetch(`http://localhost:8082/api/trades/transaction/${user.id}/${product.user.id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(product)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert("Purchase successful!");
                            // Update the user context here
                            setUser(prevUser => ({
                                ...prevUser,
                                balance: prevUser.balance - product.price
                            }));
                            navigate('/profile'); // Optionally refresh or navigate to reflect changes
                        } else {
                            alert("Failed to complete the purchase.");
                        }
                    })
                    .catch(error => console.error('Error during transaction:', error));
                }
            };
            
    return (
        <div>
            <div style={bottomBarStyle}>
                <button className="loginButton" onClick={() => navigate('/login')}>Logout</button>
                <input type="search" placeholder="Search..." style={{ opacity: 0.8, marginTop: '10px' }} />
                <button className="loginButton" style={{ marginRight: '40px' }} onClick={() => navigate('/profile')}>Go to Profile</button>
            </div>
            <div style={mainContainerStyle}>
                <h1>Welcome to the MarketPlace!</h1>
                <h2>Available Offers:</h2>
                {products.length > 0 ? products.map((product, index) => (
                    <div key={index} style={productBoxStyle}>
                        <p><b>Description</b>: {product.description}</p>
                        <p><b>Price</b>: {product.price} lei</p>
                        <p><b>Type</b>: {product.type}</p>
                        <p><b>Condition</b>: {product.condition}</p>
                        <p><b>Seller</b>: {product.user.email}</p>
                        <button className="loginButton" style={{ marginRight: '10px' }} onClick={() => fetchReviews(product.id, product.user.id)}>
                            View seller's reviews
                        </button>
                        <button className="loginButton" onClick={() => handleBuyProduct(product)}>Buy the product</button>
                        {activeProductId === product.id && reviews[product.user.id] && (
                            <div>
                                {reviews[product.user.id].map((review, idx) => (
                                    <div key={idx} style={reviewBoxStyle}>
                                        <p><strong>Rating:</strong> {review.rating}/5</p>
                                        <p><strong>Comment:</strong> {review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )) : (
                    <p>No offers available.</p>
                )}
            </div>
        </div>
    );
}

export default MainPage;
