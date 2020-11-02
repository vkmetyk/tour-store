import React from 'react';

const Review = ({ review }) => {
  return (
    <div className="reviews-block__review-block col s12 row">
      <p className="col s12 review-block__text grey-text text-darken-3">{review.text}</p>
      <span className="col s6 review-block__name blue-text text-lighten-2">
        {review.ownerName}
      </span>
      <span className="col s6 review-block__date right-align blue-text text-lighten-2">
        {new Date(review?.date).toDateString().slice(4) || ''}
      </span>
    </div>
  )
};

export default Review;