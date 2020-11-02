import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import Loader from '../components/Loader';
import Slider from '../components/Slider/Slider';
import { AuthContext } from '../context/authContext';
import { useMessage } from '../hooks/message.hook';
import Reviews from '../components/Reviews/Reviews';
import AddReviewBlock from '../components/Reviews/AddReviewBlock';

const TourPage = ({match}) => {
  const [tour, setTour] = useState({});
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const getLink = useCallback(async () => {
    try {
      const tourId = match.params.id;
      if (tourId) {
        const fetched = await request(`/api/tour/${tourId}`, 'GET', null);
        setTour(fetched);
      }
    } catch (e) {
    }
  }, [match, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  const orderAction = async (event) => {
    event.preventDefault();
    try {
      const fetched = await request(`/api/order/create/${tour._id}`, 'POST', null, {
        Authorization: `Bearer ${auth.token}`
      });
      message(fetched);
    } catch (e) {
    }
  };

  if (loading)
    return <Loader/>;

  if (!tour._id)
    return null;

  return (
    <div className="tour-page row">
      <div className="tour-page__tour-block row s12 light-blue lighten-5">
        <h1 className="col s12 tour-page__title">{tour.title || ''}</h1>
        <div className="col s12 row">
          {tour?.images?.length > 0 &&
            <Slider
              className="col s12"
              slides={tour.images}
              subtitle={tour.title}
            />
          }
        </div>
        <div className="col s12 row tour-page__about">
          <h5 className="col s12">About tour</h5>
          <pre>
            <p className="col s12 tour-page__description">
              {tour?.description.replace('↵', '\n') || ''}
            </p>
          </pre>
        </div>
        <div className="col s12 row tour-page__price-block light-blue lighten-4">
          <div className="col s6 center-align">
            {tour.price &&
            <span className="tour-page__price">{tour.price}$</span>
            }
          </div>
          <div className="col s6 row center-align">
            <a
              href="/"
              onClick={orderAction}
              className="btn col s12 waves-effect tour-page__price-button light-blue darken-1"
            >
              Order now
            </a>
          </div>
        </div>
      </div>

      <div className="divider col s12"/>

      <Reviews tourId={match.params.id}/>
      <AddReviewBlock tourId={match.params.id} />

    </div>
  );
};

export default TourPage;