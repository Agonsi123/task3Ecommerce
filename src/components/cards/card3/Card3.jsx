import React from 'react';
import './card3.scss';

const Card3 = ({ text, eye, heart, image, title, price, star, num, color, btn, description, onEyeClick }) => {
  return (
    <div className="card3Container">
       <div className="topCard">
         {text && eye && heart ? (
            <div className="cardsimage">
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
            <div className="cardsimage">
                <div className="img">{image}</div>
                <div className="topIcons">
                    <div>{heart}</div>
                    <div className="eye" 
                    onClick={onEyeClick}>
                        {eye}
                    </div>
                </div>
            </div>
        )}
        {btn ? <button className="bottomCard">{btn}</button> : ""}
       </div>
      
      <div className="cardsContent">
        <h6>{title}</h6>
        <div className="price">
          <p>{price}</p>
          <div className="card3Rating">{star}</div>
          <p className="num">{num}</p>
        </div>
        <div className="colorChange">{color}</div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card3