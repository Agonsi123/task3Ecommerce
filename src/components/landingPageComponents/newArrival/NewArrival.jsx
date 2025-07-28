import React from 'react';
import './newArrival.scss';
import na1 from '../../../assets/images/na1.svg';
import na2 from "../../../assets/images/na2.svg";
import na3 from '../../../assets/images/na3.svg';
import na4 from "../../../assets/images/na4.svg";
import redRectangle from "../../../assets/images/redRectangle.svg";
import FlashSales from '../../flashSales/FlashSales';




const NewArrival = () => {
  return (
    <section className="newAContainer">
      <FlashSales
        img1={<img src={redRectangle} alt="icon" />}
        text1="Featured"
        text2="New Arrival"
      />
      <div className="newContent">
        <div className="newLeft">
          <img src={na1} alt="image" />
        </div>
        <div className="newRight">
          <div className="newRightTop">
            <img src={na2} alt="image" />
          </div>
          <div className="newRightBottom">
            <div className="newRightBottom1">
              <img src={na3} alt="image" />
            </div>
            <div className="newRightBottom1">
              <img src={na4} alt="image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrival