import React from "react";
import "./wishlist.scss";
import Card from "../../components/cards/card1/Card";
import bsp2 from "../../assets/images/bsp2.svg";
import bsp3 from "../../assets/images/bsp3.svg";
import eop7 from "../../assets/images/eop7.svg";
import eop8 from "../../assets/images/eop8.svg";
import eop3 from "../../assets/images/eop3.svg";
import hp3 from "../../assets/images/hp3.svg";
import hp1 from "../../assets/images/hp1.svg";
import hp2 from "../../assets/images/hp2.svg";
import trash from "../../assets/images/trash.svg";
import fillEye from "../../assets/images/fillEye.svg";
import FiveStar from "../../assets/images/FiveStar.svg";
import redRectangle from "../../assets/images/redRectangle.svg";
import { useDispatch } from "react-redux";
import { addToCart, addMultipleToCart } from "../../store/inventorySlice";
import { useNavigate } from "react-router-dom";

const wishItems = [
  {
    id: 1,
    text: "-35%",
    trash: trash,
    image: <img src={bsp2} alt="bag" />,
    title: "Gucci duffle bag",
    newPrice: "$960",
    oldPrice: "$1160",
    star: "",
    num: "",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 2,
    trash: trash,
    image: <img src={bsp3} alt="bag" />,
    title: "RGB liquid CPU Cooler",
    newPrice: "$1960",
    oldPrice: "",
    star: "",
    num: "",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 3,
    trash: trash,
    image: <img src={eop7} alt="bag" />,
    title: "GP11 Shooter USB Gamepad",
    newPrice: "$550",
    oldPrice: "",
    star: "",
    num: "",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 4,
    trash: trash,
    image: <img src={eop8} alt="bag" />,
    title: "Quilted Satin Jacket",
    newPrice: "$750",
    oldPrice: "",
    star: "",
    num: "",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 5,
    text: "-35%",
    eye: fillEye,
    image: <img src={eop3} alt="bag" />,
    title: "ASUS FHD Gaming Laptop",
    newPrice: "$960",
    oldPrice: "$1160",
    star: <img src={FiveStar} alt="star" />,
    num: "(65)",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 6,
    eye: fillEye,
    image: <img src={hp3} alt="bag" />,
    title: "IPS LCD Gaming Monitor",
    newPrice: "$1160",
    oldPrice: "",
    star: <img src={FiveStar} alt="bag" />,
    num: "(65)",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 7,
    texT: "New",
    eye: fillEye,
    image: <img src={hp1} alt="bag" />,
    title: "HAVIT HV-G92 Gamepad",
    newPrice: "$560",
    oldPrice: "",
    star: <img src={FiveStar} alt="bag" />,
    num: "(65)",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 8,
    eye: fillEye,
    image: <img src={hp2} alt="bag" />,
    title: "AK-900 Wired Keyboard",
    newPrice: "$200",
    oldPrice: "",
    star: <img src={FiveStar} alt="bag" />,
    num: "(65)",
    btn: "Add To Cart",
    quantity: 1,
  },
];

const Wishlist = () => {
  const upperWishItems = wishItems.slice(0, 4);
  // console.log(upperWishItems);

  const lowerWishItems = wishItems.slice(4, 8);
  // console.log(lowerWishItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //To handle adding items to cart
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
    navigate("/scart");
  };

  // To handle bulk adding
  const handleMoveAllToBag = () => {
    const allWishItemIds = wishItems.map((item) => item.id);
    dispatch(addMultipleToCart(allWishItemIds));
    navigate("/scart");
  };

  return (
    <div className="wishlistContainer">
      <div className="wishlistCont">
        <p>Wishlist (4)</p>
        <button onClick={handleMoveAllToBag}>Move All To Bag</button>
      </div>
      <div className="cards">
        {upperWishItems.map((card) => (
          <div key={card.id}>
            <Card
              text={card.text}
              trash={<img src={card.trash} alt="trash Icon" />}
              image={card.image}
              title={card.title}
              newPrice={card.newPrice}
              oldPrice={card.oldPrice}
              star={card.star}
              num={card.num}
              btn={card.btn}
              onButtonClick={() => handleAddToCart(card.id)}
            />
          </div>
        ))}
      </div>
      <div className="wishBottom">
        <div className="wishlistCont1">
          <div className="justYou">
            <div>
              <img src={redRectangle} alt="redRectangle" />
            </div>
            <p>Just For You</p>
          </div>
          <button onClick={() => navigate("")}>See All</button>
        </div>
        <div className="cards2">
          {lowerWishItems.map((card) => (
            <div key={card.id}>
              <Card
                text={card.text}
                texT={card.texT}
                eye={<img src={card.eye} alt="eye Icon" />}
                image={card.image}
                title={card.title}
                newPrice={card.newPrice}
                oldPrice={card.oldPrice}
                star={card.star}
                num={card.num}
                btn={card.btn}
                onButtonClick={() => handleAddToCart(card.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
