import React, { useState, useEffect } from 'react';
import CatalogCard from './CatalogCard';
import Loader from '../Loader';
import { useHttp } from '../../hooks/http.hook';

const Catalog = () => {
  const [tours, setTours] = useState([]);
  const {loading, request} = useHttp();

  useEffect(() => {
    request(`/api/tour`, 'GET', null)
      .then(data => setTours(data))
      .catch();
  }, [request]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="catalog row">
      {tours?.map(tour =>
        <CatalogCard key={tour._id} tour={tour}/>)}
    </div>
  );
};

export default Catalog;