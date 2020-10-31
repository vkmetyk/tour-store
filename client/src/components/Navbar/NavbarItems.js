import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const NavbarItems = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <>
      {auth.isAuthenticated ?
        <li><a href="/" onClick={logoutHandler}>Log out</a></li> :
        <>
          <li><NavLink to="/login">Log in</NavLink></li>
          <li><NavLink to="/register">Sign up</NavLink></li>
        </>
      }
    </>
  )
};

export default NavbarItems;