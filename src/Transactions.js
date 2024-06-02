import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';

const Transactions = () => {
    const { user } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch the transactions data from your backend
        fetch(`http://localhost:8082/api/trades/getTradesByEmail/${user.email}`)
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(err => console.error('Error fetching transactions:', err));
    }, [user.email]);

    const boxStyle = {
        border: '1px solid rgba(0, 0, 0, 0.2)', // Lighter border for subtlety
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent white background
        borderRadius: '8px', // Optional: rounded corners
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Soft shadow for depth
    };

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
    }};

    return (
        <div style={mainContainerStyle}>
            <h1>Your Transactions</h1>
            {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                    <div key={index} style={boxStyle}>
                        {transaction.email_b === user.email ? (
                            <>
                                <h2>You bought</h2>
                                <div style={{ paddingLeft: '20px' }}>
                                    <p><strong>Description:</strong> {transaction.product.description}</p>
                                    <p><strong>Price:</strong> {transaction.product.price} lei</p>
                                    <p><strong>Type:</strong> {transaction.product.type}</p>
                                    <p><strong>Condition:</strong> {transaction.product.condition}</p>
                                </div>
                                <h2>From:</h2>
                                <p>{transaction.email_s}</p>
                            </>
                        ) : (
                            <>
                                <h2>You sold</h2>
                                <div style={{ paddingLeft: '20px' }}>
                                    <p><strong>Description:</strong> {transaction.product.description}</p>
                                    <p><strong>Price:</strong> {transaction.product.price} lei</p>
                                    <p><strong>Type:</strong> {transaction.product.type}</p>
                                    <p><strong>Condition:</strong> {transaction.product.condition}</p>
                                </div>
                                <h2>To:</h2>
                                <p>{transaction.email_b}</p>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
}

export default Transactions;
