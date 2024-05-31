import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [promoted, setPromoted] = useState(false);
    const [type, setType] = useState('');
    const [productCondition, setProductCondition] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                description: description,
                price: parseFloat(price),
                user: user,
                promoted: promoted ? 1 : 0,
                type: type,
                condition: productCondition
            };
            await axios.post(`http://localhost:8082/api/products/add`, payload);

            // Set success message and clear form
            setSuccessMessage('Product added successfully!');
            setDescription('');
            setPrice('');
            setPromoted(false);
            setType('');
            setProductCondition('');

            // Optionally close the form or clear success message after a delay
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // 3 seconds delay

        } catch (error) {
            console.error('Error adding product', error);
            setSuccessMessage('Failed to add product. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            {successMessage && <p>{successMessage}</p>} {/* Display success or error message */}
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <div>
                    <label>
                        Promoted:
                        <input
                            type="checkbox"
                            checked={promoted}
                            onChange={(e) => setPromoted(e.target.checked)}
                        />
                    </label>
                </div>
                <input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Condition"
                    value={productCondition}
                    onChange={(e) => setProductCondition(e.target.value)}
                    required
                />
                <button type="submit">Add Product</button>
                <button onClick={() => navigate('/profile')}>
                Cancel
            </button>
            </form>
        </div>
    );
};

export default AddProduct;
