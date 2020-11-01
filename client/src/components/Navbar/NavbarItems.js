import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const NavbarItems = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/login');
  };

  return (
    <>
      {auth.userRole === 'admin' &&
        <li><NavLink to="/create/tour" className="waves-effect">Create tour</NavLink></li>
      }
      {auth.isAuthenticated ?
        <>
          <li><NavLink to="/profile" className="waves-effect">Profile</NavLink></li>
          <li><NavLink to="/profile/orders" className="waves-effect">My orders</NavLink></li>
          <li><a href="/" onClick={logoutHandler} className="waves-effect">Log out</a></li>
        </>
        :
        <>
          <li><NavLink to="/login" className="waves-effect">Log in</NavLink></li>
          <li><NavLink to="/register" className="waves-effect">Sign up</NavLink></li>
        </>
      }
    </>
  )
};

export default NavbarItems;