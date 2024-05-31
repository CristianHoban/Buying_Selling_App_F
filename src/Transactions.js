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

    return (
        <div>
            <h1>Your Transactions</h1>
            {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                    <div key={index} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px', background: '#f0f0f0' }}>
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
