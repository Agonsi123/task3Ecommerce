import React, {useEffect, useRef} from 'react';
import './dropdown.scss';
import dropdown1 from "../../../assets/images/dropdown1.svg";
import dropdown2 from "../../../assets/images/dropdown2.svg";
import dropdown3 from "../../../assets/images/dropdown3.svg";
import dropdown4 from "../../../assets/images/dropdown4.svg";
import dropdown5 from "../../../assets/images/dropdown5.svg";
import { hideModal } from '../../../store/modalSlice';
import {login, logout} from '../../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const statisItems = [
  { id: 1, img: <img src={dropdown1} alt="userIcon" />, text: "Manage My Account" },
  { id: 2, img: <img src={dropdown2} alt="bagIcon" />, text: "My Order" },
  { id: 3, img: <img src={dropdown3} alt="cancelIcon" />, text: "My Concallations" },
  { id: 4, img: <img src={dropdown4} alt="starIcon" />, text: "My Reviews" },
];

const Dropdown = () => {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const {isAuth, user} = useSelector(state => state.auth);

    // Handle clicking outside to close dropdown
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             dispatch(hideModal());
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, [dispatch]);


    // Handle onClick of logging out and logging in
    const handleAuthClick = () => {
        if(isAuth) {
            dispatch(logout());
            dispatch(hideModal());
            navigate('/signup');
        }else{
            dispatch(login({name: user.name, identifier: user.identifier}));
            navigate('/');
        }
    };



  return (
    <div ref={dropdownRef} className="dContain">
      {statisItems.map((items) => (
        <div key={items.id} className="dropDownContainer">
          <div className="dropDownCont">
            <div className="dropdownImg">{items.img}</div>
            <span>{items.text}</span>
          </div>
        </div>
      ))}


      {/* Auth Button */}
      <div className="dropDownContainer" onClick={handleAuthClick}>
        <div className="dropDownCont">
          <div className="dropdownImg">
            <img src={dropdown5} alt="LogoutIcon" />
          </div>
          <span>{isAuth ? "Logout" : "Login"}</span>
        </div>
      </div>
    </div>
  );
}

export default Dropdown