import React from 'react';
import './bsProducts.scss';
import FlashSales from "../../flashSales/FlashSales";
import Card from '../../cards/card1/Card';
import FiveStar from "../../../assets/images/FiveStar.svg";
import FourHalfStar from "../../../assets/images/FourHalfStar.svg";
import redRectangle from "../../../assets/images/redRectangle.svg";
import bsp1 from "../../../assets/images/bsp1.svg";
import bsp2 from "../../../assets/images/bsp2.svg";
import bsp3 from "../../../assets/images/bsp3.svg";
import bsp4 from "../../../assets/images/bsp4.svg";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../../store/productSlice";
import { useNavigate } from "react-router-dom";


const productList = [
  {
    id: 1,
    image: bsp1,
    title: "The north coat",
    newPrice: "$260",
    oldPrice: "$360",
    star: FiveStar,
    num: "(65)",
    description:
      "Designed for warmth and protection in cold or inclement wether, often for outdoor activities like hiking, climbing or everyday wear in winter.",
  },
  {
    id: 2,
    image: bsp2,
    title: "Gucci duffle bag",
    newPrice: "$960",
    oldPrice: "$1160",
    star: FourHalfStar,
    num: "(65)",
    description:
      "Comes in various sizes and styles, with features like secure zipper closure, top handles, and adjustable shoulder straps.",
  },
  {
    id: 3,
    image: bsp3,
    title: "RGB liquid CPU Cooler",
    newPrice: "$160",
    oldPrice: "$170",
    star: FourHalfStar,
    num: "(65)",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 4,
    image: bsp4,
    title: "Small BookSelf",
    newPrice: "$360",
    oldPrice: "",
    star: FiveStar,
    num: "(65)",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
];

const BsProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClick = (card) => {
    dispatch(setSelectedProduct(card));
    navigate(`/product/${card.id}`);
  };

  return (
    <section className="productContainer">
      <FlashSales
        img1={<img src={redRectangle} alt="icon" />}
        text1="This Month"
        text2="Best Selling Products"
        btn
      />
      <div className="cards">
        {productList.map((card) => (
          <div key={card.id} onClick={() => handleClick(card)}>
            <Card
              image={<img src={card.image} alt={card.title} />}
              title={card.title}
              newPrice={card.newPrice}
              oldPrice={card.oldPrice}
              star={<img src={card.star} alt={card.title} />}
              num={card.num}
            />
          </div>
        ))}

      </div>
    </section>
  );
}

export default BsProducts