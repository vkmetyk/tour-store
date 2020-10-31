import React, { useState, useEffect } from 'react';
import CatalogCard from './CatalogCard';
import { useHttp } from '../hooks/http.hook';
import { Loader } from './Loader';

const Catalog = () => {
  const [tours, setTours] = useState([]);
  const {loading, request} = useHttp();

  useEffect(() => {
    request(`/api/tour`, 'GET', null)
      .then(data => setTours(data))
      .catch(e => console.log(e));
  }, [request]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="catalog row">
      {
        tours?.map(tour =>
          <CatalogCard tour={tour}/>
        )
      }
      <CatalogCard tour={{_id: 0}}/>
      <CatalogCard tour={{_id: 0}}/>
      <CatalogCard tour={{_id: 0}}/>
      <CatalogCard tour={{_id: 0}}/>
    </div>
  );
};

export default Catalog;