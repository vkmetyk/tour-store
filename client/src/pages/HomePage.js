import React from 'react';
import Catalog from '../components/Catalog/Catalog';

const HomePage = () => {
  return (
    <div>
      <Catalog filter={{category: 'Beach tours'}} />
    </div>
  )
};

export default HomePage;