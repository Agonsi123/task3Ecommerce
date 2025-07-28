import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import facebook from '../../assets/images/facebook.svg';
import linkedin from "../../assets/images/linkedin.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import iconSend from "../../assets/images/iconSend.svg";
import QRcode from "../../assets/images/QRcode.svg";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerTop">
        <div className="topFooterTop ">
          
          <div className="footerTopContent">
            <div className="content">
              <div className="logo">
                <Link to="/">Exclusive</Link>
              </div>
              <h5>Subscribe</h5>
              <p>Get 10% off your forst order</p>
            </div>
            <div className="sendEmail">
              <input type="email" name="" placeholder="Enter your email" />
              <img src={iconSend} alt="" />
            </div>
          </div>

          <div className="footerTopContent">
            <h5>Support</h5>
            <p>
              111 Bijay sarani, Dhaka, <br />
              DH 1515, Bangladesh.
            </p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>
        </div>

        <div className="bottomFooterTop">
          <div className="footerTopContent">
            <h5>Account</h5>
            <Link to="/account">My Account</Link>
            <Link to="/signup">Login/Register</Link>
            <Link to="/scart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/shop">Shop</Link>
          </div>

          <div className="footerTopContent">
            <h5>Quick Link</h5>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms Of Use</Link>
            <Link to="#">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footerTopContent">
          <div className='footerDownload'>
            <h5>Download App</h5>
            <p>Save $3 with App New User Only</p>
          </div>
          <div>
            <img src={QRcode} alt="QRCode" />
          </div>
          <div className="socials">
            <img src={facebook} alt="facebook" />
            <img src={twitter} alt="twitter" />
            <img src={instagram} alt="instagram" />
            <img src={linkedin} alt="LinkedIn" />
          </div>
          </div>
        </div>

      </div>
      <div className="footerBottom">&copy; Copyright Rimel 2022. All right reserved</div>
    </div>
  );
}

export default Footer