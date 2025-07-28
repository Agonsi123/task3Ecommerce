import React from 'react';
import './card.scss';



const Card = ({image, title, newPrice, oldPrice, star, num, description }) => {
  return (
    <div className="cardContainer">
      <div className="img">
        {image}
      </div>
      <div className="cardContent">
        <h6>{title}</h6>
        <div className="cardPrice">
          <p className="cardDiscount">{newPrice}</p>
          <strike>{oldPrice}</strike>
        </div>
        <div className="cardRating">
          <div className="cardStar">
            {star}
          </div>
          <p>{num}</p>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card