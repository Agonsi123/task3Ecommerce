import React from 'react';
import './card.scss';




const Card = ({
  text,
  eye,
  heart,
  image,
  title,
  newPrice,
  oldPrice,
  star,
  num,
  btn,
  description,
  onEyeClick,
}) => {

  
  return (
    <div className="cardContainer">
      <div className="topcardContainer">
        <div className="topCard">
          <div className="topRight">
            <p>{text}</p>
            <div className="topIcons">
              <div>{heart}</div>
              <div className='eye' onClick={onEyeClick}>{eye}</div>
            </div>
          </div>
          <div className="img">{image}</div>
        </div>
        {btn ? <button className="bottomCard">Add To Cart</button> : ""}
        {/* <button className="bottomCard">Add To Cart</button> */}
      </div>
      <div className="cardContent">
        <h6>{title}</h6>
        <div className="cardPrice">
          <p className="cardDiscount">{newPrice}</p>
          <strike>{oldPrice}</strike>
        </div>
        <div className="cardRating">
          <div className="cardStar">{star}</div>
          <p>{num}</p>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card