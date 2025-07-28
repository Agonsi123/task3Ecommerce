import React from 'react';
import './card3.scss';

const Card3 = ({image, title, price, star, num, color, description}) => {
  return (
    <div className="card3Container">
        <div className="img">{image}</div>
        <div className="cardsContent">
            <h6>{title}</h6>
            <div className="price">
                <p>{price}</p>
                <div className="card3Rating">
                    {star}
                </div>
                <p className='num'>{num}</p>
            </div>
            <div className="colorChange">
                {color}
            </div>
            <p>{description}</p>
        </div>
    </div>
  );
}

export default Card3