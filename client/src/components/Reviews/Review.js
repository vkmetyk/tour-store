import React from 'react';

const Review = ({ review }) => {
  return (
    <div className="reviews-block__review-block row">
      <p className="col s12">{review.text}</p>
      <span className="s6">{review.ownerName}</span>
      <span className="s6">{review.date}</span>
    </div>
  )
};

export default Review;