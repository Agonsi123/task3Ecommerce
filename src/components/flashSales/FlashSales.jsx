import React from 'react';
import './flashSales.scss';
import rightandLeftarrow from "../../assets/images/rightandLeft arrow.svg";


const FlashSales = ({img1, text1, text2, img2, img3, btn}) => {
  return (
    <div className="flashContainer">
      <div className="flashleft">
        <div className="flash">
          <div className="today">
            <div>{img1}</div>
            <p>{text1}</p>
          </div>
          <p>{text2}</p>
        </div>
        <div className="days">{img2}</div>
      </div>
      <div className="flashRight">
        {img3 && <img src={rightandLeftarrow} alt="Right and Left Arrows" />}
        {btn && <button className="productBtn">View All</button>}
      </div>
    </div>
  );
}

export default FlashSales