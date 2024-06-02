import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LeaveReview.css'; // Import the CSS file

const LeaveReview = () => {
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleReviewSubmit = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:8082/api/users/getByEmail/${email}`);
            if (userResponse.data) {
                const review = {
                    user: userResponse.data,
                    rating: parseInt(rating),
                    comment
                };
                await axios.post('http://localhost:8082/api/reviews/add', review);
                navigate('/profile');
            } else {
                setError('User not found.');
            }
        } catch (error) {
            setError('Error while submitting the review: ' + error.message);
        }
    };

    return (
        <div className="leave-review-container">
            <h1>Leave a Review</h1>
            <input
                type="text"
                className="leave-review-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email of the user"
            />
            <input
                type="number"
                className="leave-review-input"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating"
            />
            <textarea
                className="leave-review-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="leave-review-button" onClick={handleReviewSubmit}>Submit Review</button>
        </div>
    );
};

export default LeaveReview;
