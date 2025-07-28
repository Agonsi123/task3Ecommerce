import React from 'react';
import './services.scss';
import Card4 from '../../cards/card4/Card4';
import Services1 from '../../../assets/images/Services1.svg';
import Services2 from "../../../assets/images/Services2.svg";
import Services3 from "../../../assets/images/Services3.svg";

const Services = () => {
  return (
    <section className="servicesContainer">
      <Card4
        img={<img src={Services1} alt="bus icon" />}
        title="FREE AND FAST DELIVERY"
        text="Free delivery for all orders over $140"
      />
      <Card4
        img={<img src={Services2} alt="ear pad" />}
        title="24/7 CUSTOMER SERVICE"
        text="Friendly 24/7 customer support"
      />
      <Card4
        img={<img src={Services3} alt="icon" />}
        title="MONEY BACK GUARANTEE"
        text="We return money within 30 days"
      />
    </section>
  );
}

export default Services