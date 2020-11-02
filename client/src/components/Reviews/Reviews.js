import React, { useCallback, useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import Loader from '../Loader';
import Review from './Review';

const Reviews = ({ tourId }) => {
  const [reviews, setReviews] = useState([]);
  const {loading, request} = useHttp();

  const getReviews = useCallback(async () => {
    try {
      const fetched = await request(`/api/review/tour/${tourId}`, 'GET', null);
      setReviews(fetched);
    } catch (e) {}
  }, [request, tourId]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  if (loading)
    return <Loader />

  return (
    <div className="col s12 row reviews-block">
      <h5 className="reviews-block__title">Reviews</h5>
      {reviews.map((review, index) =>
        <Review key={index} review={review} />
      )}
    </div>
  )
}

export default Reviews;