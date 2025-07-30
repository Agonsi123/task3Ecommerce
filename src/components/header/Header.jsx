import React from "react";
import "./header.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import search from "../../assets/images/search.svg";
import heart1 from "../../assets/images/heart1.svg";
import heart2 from "../../assets/images/heart2.svg";
import cart1 from "../../assets/images/cart1.svg";
import cart2 from "../../assets/images/cart2.svg";
import userRed from "../../assets/images/userRed.svg";
import user from "../../assets/images/user.svg";
import {logout} from '../../store/authSlice';
import { toggleModal } from "../../store/modalSlice";
import { toggleMenu, closeMenu } from "../../store/menuSlice";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../landingPageComponents/dropdown/Dropdown";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const location = useLocation();
  // const {isAuth, user} = useSelector((state) => state.auth);
  const {isLoggedIn, user} = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <div className="headerContainer">
      <div className="topHeader">
        <div className="topHeaderLeft">
          <p className="summerSale">
            Summer Sale For All Swim Suits And Express Delivery - OFF 50%!
          </p>
          <span className="shopNow">ShopNow</span>
        </div>
        <div className="topHeaderRight">
          <select name="" id="">
            <option value="">English</option>
            <option value="">French</option>
            <option value="">Spanish</option>
          </select>
        </div>
      </div>
      <div className="bottomHeader">
        <div className="logo">
          <Link to="/">Exclusive</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="mobileMenuIcon" onClick={() => dispatch(toggleMenu())}>
          {isMenuOpen ? (
            <HiOutlineX size={28} color="#000" />
          ) : (
            <HiOutlineMenu size={28} color="#000" />
          )}
        </div>

        <div className="navItems">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
          {isLoggedIn ? (
            <>
              <div className="welcome">
                <p className="welcomeText">Hi, {user.name || user.identifier}</p>
                <button className="logoutBtn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <NavLink to="/signup">Sign Up</NavLink>
          )}
        </div>

        <div className="bottomHeaderRight">
          <div className="searchContain">
            <input type="text" placeholder="What are you looking for?" />
            <img src={search} alt="Search" />
          </div>

          <div className="cartContainer">
            {location.pathname === "/" && (
              <Cart
                heart={<img src={heart1} alt="icons" />}
                // cart2={<img src={cart2} alt="icons" />}
                // heart2={<img src={heart2} alt="icons" />}
                // user={<img src={userRed} alt="icons" />}
                // user2={<img src={user} alt="icons" />}
                cart={<img src={cart1} alt="icons" />}
              />
            )}
            {location.pathname === "/account" && (
              <Cart
                heart={<img src={heart1} alt="icons" />}
                cart2={<img src={cart2} alt="icons" />}
                // heart2={<img src={heart2} alt="icons" />}
                user={<img src={userRed} alt="icons" />}
                // cart={<img src={cart1} alt="icons" />}
                // user2={<img src={user} alt="icons" />}
              />
            )}
            {location.pathname === "/wishlist" && (
              <Cart
                heart2={<img src={heart2} alt="icons" />}
                cart={<img src={cart1} alt="icons" />}
                user2={<img src={user} alt="user" />}
                // heart={<img src={heart1} alt="icons" />}
                // cart2={<img src={cart2} alt="icons" />}
                // user={<img src={userRed} alt="icons" />}
              />
            )}
            {location.pathname === "/scart" && (
              <Cart
                // heart={<img src={heart1} alt="icons" />}
                cart2={<img src={cart2} alt="icons" />}
                heart2={<img src={heart2} alt="icons" />}
                user2={<img src={user} alt="user" />}
                // user={<img src={userRed} alt="icons" />}
                // cart={<img src={cart1} alt="icons" />}
              />
            )}
            {location.pathname === "/contact" && (
              <Cart
                heart={<img src={heart1} alt="icons" />}
                cart={<img src={cart1} alt="icons" />}
                user2={<img src={user} alt="user" />}
                // cart2={<img src={cart2} alt="icons" />}
                // heart2={<img src={heart2} alt="icons" />}
                // user={<img src={userRed} alt="icons" />}
              />
            )}
            {location.pathname === "/about" && (
              <Cart
                heart={<img src={heart1} alt="icons" />}
                cart={<img src={cart1} alt="icons" />}
                user2={<img src={user} alt="user" />}
                // cart2={<img src={cart2} alt="icons" />}
                // heart2={<img src={heart2} alt="icons" />}
                // user={<img src={userRed} alt="icons" />}
              />
            )}
            {location.pathname === "/product/:id" && (
              <Cart
                heart={<img src={heart1} alt="icons" />}
                user2={<img src={user} alt="user" />}
                cart={<img src={cart1} alt="icons" />}
                // cart2={<img src={cart2} alt="icons" />}
                // heart2={<img src={heart2} alt="icons" />}
                // user={<img src={userRed} alt="icons" />}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu */}

        {/* <div className={`mobileSlideMenu ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => dispatch(closeMenu())}>
            Home
          </NavLink>
          <NavLink to="/contact" onClick={() => dispatch(closeMenu())}>
            Contact
          </NavLink>
          <NavLink to="/about" onClick={() => dispatch(closeMenu())}>
            About
          </NavLink>
          <NavLink to="/signup" onClick={() => dispatch(closeMenu())}>
            Sign Up
          </NavLink>
        </div> */}

        {isMenuOpen && (
          <div className="mobileMenu">
            <NavLink to="/" onClick={() => dispatch(closeMenu())}>
              Home
            </NavLink>
            <NavLink to="/contact" onClick={() => dispatch(closeMenu())}>
              Contact
            </NavLink>
            <NavLink to="/about" onClick={() => dispatch(closeMenu())}>
              About
            </NavLink>
            {isAuth ? (
              <>
                <span className="welcomeText">Hello, {user.name}</span>
                <span
                  className="logoutBtn"
                  onClick={() => {
                    dispatch(logout());
                    dispatch(closeMenu());
                  }}
                >
                  Logout
                </span>
              </>
            ) : (
              <NavLink to="/signup" onClick={() => dispatch(closeMenu())}>
                Sign Up
              </NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

export const Cart = ({ heart, heart2, cart, cart2, user, user2 }) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="cart">
      <Link to="/wishlist">
        <div className="cartIcons">{heart}</div>
      </Link>
      <div className="cartIcons">{heart2}</div>
      <Link to="/scart">
        <div className="cartIcons">{cart}</div>
      </Link>
      <div className="cartIcons">{cart2}</div>
      {isAuth ? (
        <Link>
          <div className="cartIcons" onClick={() => dispatch(toggleModal())}>
            {user}
          </div>
        </Link>
      ) : (
        <Link to="/signin">
          <div className="cartIcons">{user2}</div>
        </Link>
      )}
      {/* <div className="cartIcons">{user2}</div>
      <div className="cartIcons" onClick={() => dispatch(toggleModal())}>
        {user}
      </div> */}
      {isActive && <Dropdown />}
    </div>
  );
};
