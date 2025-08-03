import React, { useEffect, useState } from "react";
import "./productDetails.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedProduct } from "../../store/productSlice";
import { useNavigate, Link } from "react-router-dom";
import { addToCart } from "../../store/inventorySlice";
import colourChange4 from "../../assets/images/colourChange4.svg";
import heart1 from "../../assets/images/heart1.svg";
import delivery1 from "../../assets/images/delivery1.svg";
import delivery2 from "../../assets/images/delivery2.svg";
import redRectangle from "../../assets/images/redRectangle.svg";
import FlashSales from "../../components/flashSales/FlashSales";
import Card from "../../components/cards/card1/Card";
import hp1 from "../../assets/images/hp1.svg";
import hp2 from "../../assets/images/hp2.svg";
import hp3 from "../../assets/images/hp3.svg";
import bsp3 from "../../assets/images/bsp3.svg";
import FiveStar from "../../assets/images/FiveStar.svg";
import FourStar from "../../assets/images/FourStar.svg";
import FourHalfStar from "../../assets/images/FourHalfStar.svg";
import fillEye from "../../assets/images/fillEye.svg";
import fillHeart from "../../assets/images/fillHeart.svg";



const productList = [
  {
    id: 1,
    text: "-40%",
    
    image: hp1,
    title: "HAVIT HV-G92 Gamepad",
    newPrice: "$120",
    oldPrice: "$160",
    star: FiveStar,
    num: "(88)",
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
  },
  {
    id: 2,
    image: hp2,
    title: "AK-900 Wired Keyboard",
    newPrice: "$960",
    oldPrice: "$1160",
    star: FourStar,
    num: "(75)",
    btn: "Add To Cart",
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
  },
  {
    id: 3,
    image: hp3,
    title: "IPS LCD Gaming Monitor",
    newPrice: "$370",
    oldPrice: "$400",
    star: FiveStar,
    num: "(99)",
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
  },
  {
    id: 4,
    image: bsp3,
    title: "RGB liquid CPU Cooler",
    newPrice: "$375",
    oldPrice: "$400",
    star: FourHalfStar,
    num: "(99)",
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
  },
];

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the selected product from Redux state
    const product = useSelector((state) => state.product.selectedProduct);

  if (!product) {
    return (
      <div className="detailsContainer">
        <p>Product not found. Please return to the homepage.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handleBack = () => {
    dispatch(clearSelectedProduct());
    navigate("/account");
  };

  //To handle adding items to cart
  const handleAddToCart = (product) => {
    const formattedProduct = {
        id: product.id,
        title: product.title,
        image: typeof product.image === "string" ? product.image : product.image.props?.src || "",
        price: Number(product.newPrice.replace(/\$/g, "")),
        quantity: 1,
    };
    dispatch(addToCart(formattedProduct));
    navigate("/scart");
};


  return (
    <div className="productDetailsContainer">
      <div className="roadMap">
        <p onClick={handleBack}>Account /</p>
        <p>Gaming /</p>
        <p>{product.title}</p>
      </div>
      <div className="detailsContainer">
        <div className="detailsCont">
          <div className="detailsLeft">
            <div className="detailsImgLeft">
              <div className="topLeftImg1">
                <div className="leftImg1">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="leftImg1">
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
              <div className="bottomLeftImg1">
                <div className="leftImg1">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="leftImg1">
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
            </div>
            <div className="detailsImg">
              <img src={product.image} alt={product.title} />
            </div>
          </div>
          <div className="detailsText">
            <h4>{product.title}</h4>
            <div>
              <img src={product.star} alt="star" />
            </div>
            <p>{product.newPrice}</p>
            <div className="detailsContent">
              <p>{product.description || "No description avaiable."}</p>
            </div>
            <div className="Btn">
              <p>Colours:</p>
              <img src={colourChange4} alt="" />
            </div>
            <div className="Btn">
              <p>Size:</p>
              <div className="sizeBtn">
                <button>XS</button>
                <button>S</button>
                <button className="btnMedium">M</button>
                <button>L</button>
                <button>XL</button>
              </div>
            </div>
            <div className="Btn">
              <div className="plus">
                <button className="btnMinus">-</button>
                <p>2</p>
                <button className="btnPlus">+</button>
              </div>
              <button
                // onClick={handleAddToCart}
                onClick={() => handleAddToCart(product)}
                className="buyNowBtn"
              >
                Buy Now
              </button>
              <div className="heart">
                <img src={heart1} alt="" />
              </div>
            </div>
            <div className="delivery">
              <div className="contDelivery">
                <div className="freeDeliveryIcon">
                  <img src={delivery1} alt="Icon" />
                </div>
                <div className="deliveryContent">
                  <h6>Free Delivery</h6>
                  <p>Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <hr />
              <div className="contDelivery">
                <div className="returnDeliveryIcon">
                  <img src={delivery2} alt="Icon" />
                </div>
                <div className="deliveryContent">
                  <h6>Return Delivery</h6>
                  <p>
                    Free 30 Days Delivery Returns.
                    <Link to="#">
                      <span>Details</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detailsBottom">
        <FlashSales img1={<img src={redRectangle} alt="icon" />} text1="Related Item" />
        <div className="cards">
          {productList.map((card) => (
            <div key={card.id}>
              <Card
                image={<img src={card.image} alt={card.title} />}
                title={card.title}
                newPrice={card.newPrice}
                oldPrice={card.oldPrice}
                star={<img src={card.star} alt={card.title} />}
                num={card.num}
                btn={card.btn}
                onButtonClick={() => handleAddToCart(card)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
