import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Call center schedule:</h5>
            <p className="grey-text text-lighten-4">
              Weekdays: 08:00 to 21:00<br/>
              Saturday: 09:00 to 20:00<br/>
              Sunday: 10:00 to 19:00<br/>
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Contact us</h5>
            <ul>
              <li><span className="grey-text text-lighten-3" >+38 044 000-00-00</span></li>
              <li><span className="grey-text text-lighten-3">+38 093 000-00-00</span></li>
              <li><span className="grey-text text-lighten-3">shop.email@gmail.com</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container row">
          <p className="s12 m6 col">© 2020 Travel Anywhere, All rights reserved.</p>
          <div className="right-align col s12 m6">
            <img src="/assets/mastercard-logo.svg" alt="Mastercard" />
            <img src="/assets/visa-logo.svg" alt="Mastercard" />
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;