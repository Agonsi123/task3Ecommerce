import React from 'react';
import './wishlist.scss';
import Card from '../../components/cards/card1/Card';
import wish1 from '../../assets/images/wish1.svg';
import wish8 from "../../assets/images/wish8.svg";
import wish2 from "../../assets/images/wish2.svg";
import wish3 from "../../assets/images/wish3.svg";
import wish4 from "../../assets/images/wish4.svg";
import wish5 from "../../assets/images/wish5.svg";
import wish6 from "../../assets/images/wish6.svg";
import wish7 from "../../assets/images/wish7.svg";
import FiveStar from "../../assets/images/FiveStar.svg";
import redRectangle from "../../assets/images/redRectangle.svg";
import { useDispatch } from 'react-redux';
import { addToCart, addMultipleToCart } from '../../store/inventorySlice';
import { useNavigate } from 'react-router-dom';


const wishItems = [
  {
    id: 1,
    image: <img src={wish1} alt="bag" />,
    title: "Gucci duffle bag",
    newPrice: "$960",
    oldPrice: "$1160",
    star: "",
    num: "",
    quantity: 1
  },
  {
    id: 2,
    image: <img src={wish2} alt="bag" />,
    title: "RGB liquid CPU Cooler",
    newPrice: "$1960",
    oldPrice: "",
    star: "",
    num: "",
    quantity: 1
  },
  {
    id: 3,
    image: <img src={wish3} alt="bag" />,
    title: "GP11 Shooter USB Gamepad",
    newPrice: "$550",
    oldPrice: "",
    star: "",
    num: "",
    quantity: 1
  },
  {
    id: 4,
    image: <img src={wish4} alt="bag" />,
    title: "Quilted Satin Jacket",
    newPrice: "$750",
    oldPrice: "",
    star: "",
    num: "",
    quantity: 1
  },
  {
    id: 5,
    image: <img src={wish5} alt="bag" />,
    title: "ASUS FHD Gaming Laptop",
    newPrice: "$960",
    oldPrice: "$1160",
    star: <img src={FiveStar} alt='star' />,
    num: "(65)",
    quantity: 1
  },
  {
    id: 6,
    image: <img src={wish6} alt="bag" />,
    title: "IPS LCD Gaming Monitor",
    newPrice: "$1160",
    oldPrice: "",
    star: <img src={FiveStar} alt="bag" />,
    num: "(65)",
    quantity: 1
  },
  {
    id: 7,
    image: <img src={wish7} alt="bag" />,
    title: "HAVIT HV-G92 Gamepad",
    newPrice: "$560",
    oldPrice: "",
    star: <img src={FiveStar} alt="bag" />,
    num: "(65)",
    quantity: 1
  },
  {
    id: 8,
    image: <img src={wish8} alt="bag" />,
    title: "AK-900 Wired Keyboard",
    newPrice: "$200",
    oldPrice: "",
    star: <img src={FiveStar} alt="bag" />,
    num: "(65)",
    quantity: 1
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
    navigate("/scart")
  };

  // To handle bulk adding
  const handleMoveAllToBag = () => {
    const allWishItemIds = wishItems.map(item => item.id);
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
          <div key={card.id} onClick={() => handleAddToCart(card.id)}>
            <Card
              image={card.image}
              title={card.title}
              newPrice={card.newPrice}
              oldPrice={card.oldPrice}
              star={card.star}
              num={card.num}
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
        <div className="cards">
          {lowerWishItems.map((card) => (
            <div key={card.id} onClick={() => handleAddToCart(card.id)}>
              <Card
                image={card.image}
                title={card.title}
                newPrice={card.newPrice}
                oldPrice={card.oldPrice}
                star={card.star}
                num={card.num}
              />
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Wishlist