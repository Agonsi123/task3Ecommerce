import React from 'react';
import './card4.scss';

const Card4 = ({img, title, text}) => {
  return (
    <div className='card4Container'>
        <div className='cardImg'>
            {img}
        </div>
        <div className="card4Content">
            <h6>{title}</h6>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default Card4