import NavbarItems from './Navbar/NavbarItems';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userStorageName } from '../constants';
import { AuthContext } from '../context/authContext';

const Sidebar = ({idName}) => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (auth.isAuthenticated)
      setUserData(JSON.parse(localStorage.getItem(userStorageName)) ?? {});
    else
      setUserData({});
  }, [auth]);

  return (
    <ul id={idName} className="sidenav">
      <li>
        <div className="user-view">
          <Link to="/profile">
            <div className="background">
              <img src={userData.img ? userData.img : 'assets/background-profile.jpg'} />
            </div>
            <img className="circle" src="assets/passenger.svg" alt="Profile" />
            <span className="white-text name">
              {userData.name ? userData.name : 'Dear friend'}
            </span>
            <span className="white-text email">
              {userData.email && userData.email}
            </span>
          </Link>
        </div>
      </li>
      <li>
        <Link to="/contacts">
          <i className="material-icons">cloud</i>Contact us
        </Link>
      </li>
      <li><a href="#!">Second Link</a></li>
      <li>
        <div className="divider"></div>
      </li>
      {/*<li><a className="subheader">Useful links</a></li>*/}
      <NavbarItems/>
    </ul>
  );
};

export default Sidebar;