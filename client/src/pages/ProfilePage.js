import React, { useContext, useEffect, useState } from 'react';
import Orders from '../components/Orders/Orders';
import { AuthContext } from '../context/authContext';
import { userStorageName } from '../constants';

const ProfilePage = () => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (auth.isAuthenticated)
      setUserData(JSON.parse(localStorage.getItem(userStorageName)) ?? {});
    else
      setUserData({});
  }, [auth]);

  return (
    <div className="row container profile-block">
      <ul className="collection">
        <li className="collection-item profile-block__name row">
          <i className="material-icons col">account_circle</i>
          <span className="col">{userData?.name || ''}</span>
        </li>
        <li className="collection-item profile-block__email row">
          <i className="material-icons col">email</i>
          <span className="col">{userData?.email || ''}</span>
        </li>
      </ul>
      <Orders />
    </div>
  )
};

export default ProfilePage;