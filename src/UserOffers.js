import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

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

    return (
        <div>
            <h1>Your Offers</h1>
            <div>
                {offers.map((offer, index) => (
                    <div key={index}>
                        <img src={offer.imageUrl} alt={offer.title} />
                        <h3>{offer.type}</h3>
                        <p>{offer.description}</p>
                        <p><b>Price:</b> {offer.price} lei</p>
                        <p><b>Product condition:</b> {offer.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOffers;
