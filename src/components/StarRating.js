import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'star-filled' : 'star-empty'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;