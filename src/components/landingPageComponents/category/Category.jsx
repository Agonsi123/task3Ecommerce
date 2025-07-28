import React from 'react';
import './category.scss';
import FlashSales from "../../flashSales/FlashSales";
import Card2 from '../../cards/card2/Card2';
import redRectangle from "../../../assets/images/redRectangle.svg";
import bc1 from "../../../assets/images/bc1.svg";
import bc2 from "../../../assets/images/bc2.svg";
import bc3 from "../../../assets/images/bc3.svg";
import bc4 from "../../../assets/images/bc4.svg";
import bc5 from "../../../assets/images/bc5.svg";
import bc6 from "../../../assets/images/bc6.svg";






const Category = () => {
  return (
    <section className="categoryContainer">
      <FlashSales
        img1={<img src={redRectangle} alt="icon" />}
        text1="Categories"
        text2="Browse By Category"
        // img2={<img src={dateImage} alt="image" />}
        img3
      />
      <div className="cards2">
        <div className="cards2Top">
          <Card2 image={<img src={bc1} alt="Comfort Chair" />} />
          <Card2 image={<img src={bc2} alt="Comfort Chair" />} />
          <Card2 image={<img src={bc3} alt="Comfort Chair" />} />
        </div>
        <div className="cards2Bottom">
          <Card2 image={<img src={bc4} alt="Comfort Chair" />} />
          <Card2 image={<img src={bc5} alt="Comfort Chair" />} />
          <Card2 image={<img src={bc6} alt="Comfort Chair" />} />
        </div>
      </div>
    </section>
  );
}

export default Category