import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import NavbarItems from './NavbarItems';
import Sidebar from '../Sidebar';

const Navbar = () => {

  useEffect(() => {
    let sidenav = document.querySelector('#sidebar-menu');
    M.Sidenav.init(sidenav, {});
  }, []);

  return (
    <header>
      <nav className="nav-menu-block light-blue darken-3 header__navbar">
        <div className="nav-wrapper">
          <span data-target="sidebar-menu" className="sidenav-trigger show-on-large"><i
            className="material-icons">menu</i></span>
          <Link to="/" className="brand-logo flow-text" style={{width: 'fit-content'}}>
            Travel Anywhere
          </Link>
          <ul id="nav-menu" className="right hide-on-med-and-down">
            <NavbarItems />
          </ul>
        </div>
      </nav>
      <ul id="mobile-nav-menu" className="sidenav">
        <NavbarItems />
      </ul>
        <Sidebar idName={'sidebar-menu'} />
    </header>
  );
};

export default Navbar;