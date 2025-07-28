import React from 'react';
import './hero.scss';
import leftArrow from "../../assets/images/leftArrow.svg";
import heroImage from "../../assets/images/heroImage.svg";

const Hero = () => {
  return (
    <div className="heroContainer">
        <div className="heroLeft">
            <div className="fashion">
                <p>Women's Fashion</p>
                <img src={leftArrow} alt="" />
            </div>
            <div className="fashion">
                <p>Men's Fashion</p>
                <img src={leftArrow} alt="" />
            </div>
            <p>Electronics</p>
            <p>Home & Lifestyle</p>
            <p>Medicines</p>
            <p>Sports & Outdoor</p>
            <p>Baby's & Toys</p>
            <p>Groceries & Pets</p>
            <p>Health & Beauty</p>
        </div>
        <div className='divider'></div>
        <div className="heroRight">
            <img src={heroImage} alt="" />
        </div>
    </div>
  );
}

export default Hero