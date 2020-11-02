import React, { useState, useEffect, useCallback } from 'react';
import CatalogCard from './CatalogCard';
import Loader from '../Loader';
import { useHttp } from '../../hooks/http.hook';

const Catalog = () => {
  const [tours, setTours] = useState([]);
  const [category, setCategory] = useState('');
  const {loading, request} = useHttp();
  const [categories, setCategories] = useState([]);

  const loadCategories = useCallback(async () => {
    try {
      const fetched = await request('/api/category', 'GET', null);
      setCategories(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const selects = document.querySelectorAll('select');
    window.M.FormSelect.init(selects, {});
    window.M.updateTextFields();
  });

  const changeHandler = useCallback(async () => {
    try {
      let fetched = null;

      if (category)
        fetched = await request('/api/tour/filter', 'POST', {category});
      else
        fetched = await request('/api/tour', 'GET', null);
      setTours(fetched);
    } catch (e) {}
  }, [category, request]);

  useEffect(() => {
    changeHandler();
  }, [category, changeHandler]);

  if (loading) {
    return <Loader/>;
  }

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <div className="input-field category-filter center-block">
        <select
          name="category"
          onChange={changeCategory}
          defaultValue={null}
          className="col s10 center-align"
        >
          {categories.map((category, index) =>
            <option key={index} value={category.name}>{category.name}</option>
          )}
        </select>
        <label>Category</label>
      </div>
      <div className="catalog row">
        {tours?.map(tour =>
          <CatalogCard key={tour._id} tour={tour}/>)}
      </div>
    </>
  );
};

export default Catalog;