import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';

const TourPage = ({ match }) => {
  const [tour, setTour] = useState({});
  const {loading, request} = useHttp();

  const getLink = useCallback(async () => {
    try {
      const tourId = match.params.id;
      if (tourId) {
        const fetched = await request(`/api/tour/${tourId}`, 'GET', null);
        setTour(fetched);
        console.log(fetched);
      }
    } catch (e) {}
  }, [match, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading)
    return <Loader/>;

  return (
    <div className="tour-block">

      <div className="row">
        <img className="col s12 tour-block__img" src={tour.img || '/assets/default.jpg'} />
        <h2 className="col s6">{tour.title || ''}</h2>
        <span className="col s6">{tour.category || ''}</span>
        <p className="col s12">{tour.description || ''}</p>
      </div>

      {tour.price &&
        <div className="row">
          <a className="btn col s6 waves-effect waves-light">Order now</a>
          <span className="col s6">{tour.price}$</span>
        </div>
      }

    </div>
  )
};

export default TourPage;