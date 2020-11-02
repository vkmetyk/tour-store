import React from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {
  if (!order)
    return null;

  return (
    <li className="collection-item orders-block__order row">
      <Link to={`/tour/${order.tour}`} className="col s6">
        Open tour
      </Link>
      <span className="right tour-date col s6">
        {new Date(order?.date).toDateString().slice(4) || ''}
      </span>
    </li>
  );
};

export default Order;