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
      console.log(fetched);
      setReviews(fetched);
    } catch (e) {}
  }, [request, tourId]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  if (loading)
    return <Loader />

  return (
    <div className="reviews-block">
      {reviews.map((review, index) =>
        <Review key={index} review={review} />
      )}
    </div>
  )
}

export default Reviews;