import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useMessage } from '../../hooks/message.hook';
import { useHttp } from '../../hooks/http.hook';
import Order from './Order';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/order/`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      });
      setOrders(fetched);
    } catch (e) {}
  }, [auth, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading)
    return null;

  return (
    <ul className="orders-block collection with-header">
      <li className="collection-header"><h4>Orders:</h4></li>
      {orders?.length <= 0 &&
        <li className="collection-item">Your orders history is empty :(</li>
      }
      {orders.map((order, index) => (
        <Order key={index} order={order} />
      ))}
    </ul>
  );
}

export default Orders;