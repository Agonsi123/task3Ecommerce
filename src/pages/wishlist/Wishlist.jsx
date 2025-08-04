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
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProduct,
  removeFromWishlist,
  removeMultipleFromWishlist,
} from "../../store/productSlice";
import { addToCart, addMultipleToCart } from "../../store/inventorySlice";
import { useNavigate } from "react-router-dom";

const wishItems = [
  {
    id: 1,
    text: "-35%",
    eye: fillEye,
    image: eop3,
    title: "ASUS FHD Gaming Laptop",
    newPrice: "$960",
    oldPrice: "$1160",
    star: FiveStar,
    num: "(65)",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 2,
    eye: fillEye,
    image: hp3,
    title: "IPS LCD Gaming Monitor",
    newPrice: "$1160",
    oldPrice: "",
    star: FiveStar,
    num: "(65)",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 3,
    texT: "New",
    eye: fillEye,
    image: hp1,
    title: "HAVIT HV-G92 Gamepad",
    newPrice: "$560",
    oldPrice: "",
    star: FiveStar,
    num: "(65)",
    btn: "Add To Cart",
    quantity: 1,
  },
  {
    id: 4,
    eye: fillEye,
    image: hp2,
    title: "AK-900 Wired Keyboard",
    newPrice: "$200",
    oldPrice: "",
    star: FiveStar,
    num: "(65)",
    btn: "Add To Cart",
    quantity: 1,
  },
];

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.product.wishlist);

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

  // To handle bulk adding

  const handleMoveAllToBag = () => {
    const allWishItemsFormatted = wishlist.map((product) => ({
      id: product.id,
      title: product.title,
      image: typeof product.image === "string" ? product.image : product.image.props?.src || "",
      price: Number((product.price || product.newPrice || "0").toString().replace(/\$/g, "")),
      quantity: product.quantity || 1,
    }));
    dispatch(addMultipleToCart(allWishItemsFormatted));
    dispatch(removeMultipleFromWishlist(wishlist.map((item) => item.id)));
    navigate("/scart");
  };

  // Handle remove product from wishlist
  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  // Handle view items in product details
  const handleClick = (card) => {
    dispatch(setSelectedProduct(card));
    navigate(`/product/${card.id}`);
  };

  return (
    <div className="wishlistContainer">
      <div className="wishlistCont">
        <p>Wishlist (4)</p>
        <button onClick={handleMoveAllToBag}>Move All To Bag</button>
      </div>
      {wishlist.length === 0 ? (
        <p className="empty">Your wishlist is empty.</p>
      ) : (
        <div className="cards">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlistCard">
              <div className="cardImage">
                <img src={product.image} alt={product.title} />
                <button className="removeBtn" onClick={() => handleRemove(product.id)}>
                  <FaTrashCan />
                </button>
              </div>
              <div className="addtoCartBtn" onClick={() => handleAddToCart(product)}>
                Add To Cart
              </div>
              <div className="info">
                <h4>{product.title}</h4>
                <div className="cardPrice">
                  <p className="newPrice">{product.newPrice}</p>
                  <p>
                    <strike>{product.oldPrice}</strike>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
          {wishItems.map((card) => (
            <div key={card.id}>
              <Card
                text={card.text}
                texT={card.texT}
                eye={<img src={card.eye} alt="view details" />}
                image={<img src={card.image} alt={card.title} />}
                title={card.title}
                newPrice={card.newPrice}
                oldPrice={card.oldPrice}
                star={<img src={card.star} alt="ratings" />}
                num={card.num}
                btn={card.btn}
                onEyeClick={() => handleClick(card)}
                onButtonClick={() => handleAddToCart(card)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
