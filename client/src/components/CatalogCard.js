import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CatalogCard = ({ tour }) => {
  const imageRef = useRef();

  useEffect(() => {
    window.M.Materialbox.init(imageRef.current);
  }, []);

  if (!tour || !('_id' in tour))
    return null;

  return (
    <div className="col s12 m6">
      <div className="card large">
        <div className="card-image">
          <img
            ref={imageRef}
            className="materialboxed"
            src={tour.img || 'assets/example.jpg'}
            alt="No example"
          />
          <Link to={`/tour/${tour._id}`}>
            <span className="card-title">{tour.title ?? 'Title'}</span>
          </Link>
        </div>
        <div className="card-content">
          <p>{tour.short_description ?? 'I am a very simple card. I am good at containing small bits of information.' +
          'I am convenient because I require little markup to use effectively.'}</p>
        </div>
        <div className="card-action">
          <Link to={`/tour/${tour._id}`}>Look more</Link>
        </div>
      </div>
    </div>
  )
};

export default CatalogCard;