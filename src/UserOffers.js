import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import './UserOffers.css'; // Make sure the CSS is imported correctly

const UserOffers = () => {
    const { user } = useContext(UserContext);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:8082/api/products/getByUserIdExTrades/${user.id}`);
                    setOffers(response.data);
                } catch (error) {
                    console.error("Failed to fetch offers:", error);
                }
            }
        };

        fetchOffers();
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

    const deleteOffer = async (id) => {
        if (window.confirm("Are you sure you want to delete this offer?")) {
            try {
                const response = await axios.delete(`http://localhost:8082/api/products/delete/${id}`);
                if (response.status === 204) {
                    // Filter out the deleted offer from the offers list
                    setOffers(currentOffers => currentOffers.filter(offer => offer.id !== id));
                    alert("Offer deleted successfully.");
                } else {
                    alert("Failed to delete the offer.");
                }
            } catch (error) {
                console.error("Error deleting offer:", error);
                alert("Failed to delete the offer.");
            }
        }
    };

    return (
        <div style={mainContainerStyle}>
            <h1>Your Offers</h1>
            <h2>Available Listings</h2> {/* Additional subtitle if needed */}
            {offers.length > 0 ? offers.map((offer, index) => (
                <div key={index} className="offer-container">
                    <img src={offer.imageUrl} alt={offer.title} />
                    <h3 className="offer-title">{offer.type}</h3>
                    <p className="offer-text">{offer.description}</p>
                    <p className="offer-price"><b>Price:</b> {offer.price} lei</p>
                    <p className="offer-condition"><b>Product condition:</b> {offer.condition}</p>
                    <button className="offerButton" onClick={() => deleteOffer(offer.id)}>Delete Offer</button>
                </div>
            )) : (
                <p>No offers found.</p>
            )}
        </div>
    );
};

export default UserOffers;
