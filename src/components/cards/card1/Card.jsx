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
        

        {text && eye && heart ? (
          <div className="topRight">
            <p>{text}</p>
            <div className="img">{image}</div>
            <div className="topIcons">
              <div>{heart}</div>
              <div className="eye" onClick={onEyeClick}>
                {eye}
              </div>
            </div>
          </div>
        ) : (
          <div className="topRight">
            <div className="img">{image}</div>
            <div className="topIcons">
              <div>{heart}</div>
              <div className="eye" onClick={onEyeClick}>
                {eye}
              </div>
            </div>
          </div>
        )}

        {btn ? <button className="bottomCard">{btn}</button> : ""}
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