import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const CatalogCard = ({ tour }) => {
  const imageRef = useRef();
  const auth = useContext(AuthContext);

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
            src={(tour?.images?.length && tour?.images[0]) || '/assets/example.jpg'}
            alt="No example"
          />
          {auth.isAdmin &&
            <Link
              to={`/editor/tour/${tour._id}`}
              className="btn-floating halfway-fab waves-effect waves-light light-blue darken-3 edit-tour-link">
              <i className="material-icons">edit</i>
            </Link>
          }
          <Link to={`/tour/${tour._id}`}>
            <span className="card-title">{tour.title ?? 'Title'}</span>
          </Link>
        </div>
        <div className="card-content">
          <span>
            {tour.short_description ?? ''}
          </span>
        </div>
        <div className="card-action">
          <Link to={`/tour/${tour._id}`} className="card-action__link">Open</Link>
          {tour.date &&
            <span className="right tour-date">
              {new Date(tour?.date).toDateString().slice(4) || ''}
            </span>
          }
        </div>
      </div>
    </div>
  )
};

export default CatalogCard;