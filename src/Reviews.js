import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import './Reviews.css'; // Import the new CSS for styling reviews

const Reviews = () => {
    const { user } = useContext(UserContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8082/api/reviews/getByUserId/${user.id}`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(err => console.error('Error fetching reviews:', err));
    }, [user.email]);

    return (
        <div>
            <h1>Your Reviews</h1>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review-container">
                        <p className="review-rating"><strong>Rating:</strong> {review.rating}/5</p>
                        <p className="review-text"><strong>Comment:</strong> {review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
}

export default Reviews;
