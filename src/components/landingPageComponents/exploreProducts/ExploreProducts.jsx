import React from 'react';
import './exploreProducts.scss';
import FlashSales from '../../flashSales/FlashSales';
import Card3 from '../../cards/card3/Card3';
import redRectangle from "../../../assets/images/redRectangle.svg";
import rightandLeftarrow from "../../../assets/images/rightandLeft arrow.svg";
import FiveStar from "../../../assets/images/FiveStar.svg";
import FourStar from "../../../assets/images/FourStar.svg";
import FourHalfStar from "../../../assets/images/FourHalfStar.svg";
import ThreeStar from "../../../assets/images/ThreeStar.svg";
import eop1 from "../../../assets/images/eop1.svg";
import eop2 from "../../../assets/images/eop2.svg";
import eop3 from "../../../assets/images/eop3.svg";
import eop4 from "../../../assets/images/eop4.svg";
import eop5 from "../../../assets/images/eop5.svg";
import eop6 from "../../../assets/images/eop6.svg";
import eop7 from "../../../assets/images/eop7.svg";
import eop8 from "../../../assets/images/eop8.svg";
import colourChange1 from "../../../assets/images/colourChange1.svg";
import colourChange2 from "../../../assets/images/colourChange2.svg";
import colourChange3 from "../../../assets/images/colourChange3.svg";
import colourChange4 from "../../../assets/images/colourChange4.svg";
import Button from '../../buttons/Button';
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../../store/productSlice";
import { useNavigate } from "react-router-dom";




const productList = [
  {
    id: 1,
    image: eop1,
    title: "Breed Dry Dog Food",
    price: "$100",
    star: ThreeStar,
    num: "(35)",
    description:
      "Designed for warmth and protection in cold or inclement wether, often for outdoor activities like hiking, climbing or everyday wear in winter.",
  },
  {
    id: 2,
    image: eop2,
    title: "CANON EOS DSLR Camer",
    price: "$360",
    star: FourStar,
    num: "(55)",
    description:
      "Comes in various sizes and styles, with features like secure zipper closure, top handles, and adjustable shoulder straps.",
  },
  {
    id: 3,
    image: eop3,
    title: "ASUS FHD Gaming Laptop",
    price: "$700",
    star: FiveStar,
    num: "(325)",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 4,
    image: eop4,
    title: "Curology Product Set",
    price: "$500",
    star: FourStar,
    num: "(1455)",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 5,
    image: eop5,
    title: "Kids Electric Car",
    price: "$960",
    star: FiveStar,
    num: "(65)",
    color: colourChange1,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 6,
    image: eop6,
    title: "Jr. Zoom Soccer Cleats",
    price: "$1160",
    star: FiveStar,
    num: "(35)",
    color: colourChange2,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 7,
    image: eop7,
    title: "GP11 Shooter USB Gamepad",
    price: "$660",
    star: FourHalfStar,
    num: "(55)",
    color: colourChange3,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 8,
    image: eop8,
    title: "Quilted Satin Jacket",
    price: "$660",
    star: FourHalfStar,
    num: "(55)",
    color: colourChange4,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
];


const ExploreProducts = () => {
  const upperProductList = productList.slice(0, 4);
  const lowerProductList = productList.slice(4, 8);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.id}`);
  };


  return (
    <section className="exploreContainer">
      <FlashSales
        img1={<img src={redRectangle} alt="icon" />}
        text1="Our Products"
        text2="Explore Our Products"
        // img2={<img src={dateImage} alt="image" />}
        img3={<img src={rightandLeftarrow} alt="Right and Left Arrows" />}
      />
      <div className="cards3">

        {upperProductList.map((product) => (
          <div key={product.id} onClick={() => handleClick(product)}>
            <Card3
              image={<img src={product.image} alt={product.title} />}
              title={product.title}
              price={product.price}
              star={<img src={product.star} alt="ratings" />}
              num={product.num}
            />
          </div>
        ))}
        
      </div>
      <div className="cards3">

        {lowerProductList.map((product) => (
          <div key={product.id} onClick={() => handleClick(product)}>
            <Card3
              image={<img src={product.image} alt={product.title} />}
              title={product.title}
              price={product.price}
              star={<img src={product.star} alt="ratings" />}
              num={product.num}
              color={<img src={product.color} alt="color change" />}
            />
          </div>
        ))}

      </div>
      <Button>View All Products</Button>
    </section>
  );
}

export default ExploreProducts