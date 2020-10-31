import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';

const TourPage = ({ match }) => {
  const [tour, setTour] = useState([]);
  const {loading, request} = useHttp();


  const getLink = useCallback(async () => {
    try {
      const tourId = match.params.id;
      if (tourId) {
        const fetched = await request(`/api/tour/${tourId}`, 'GET', null);
        setTour(fetched);
      }
    } catch (e) {}
  }, [match, request])

  useEffect(() => {
    getLink()
  }, [tour, getLink])

  if (loading) {
    return <Loader/>;
  }

  return (
    <div>
      TOUR page
      {tour}
    </div>
  )
};

export default TourPage;