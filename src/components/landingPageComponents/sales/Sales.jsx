import React from "react";
import "./sales.scss";
import FlashSales from '../../flashSales/FlashSales';
import Card from "../../cards/card1/Card";
import Button from "../../buttons/Button";
import dateImage from "../../../assets/images/dateImage.svg";
import FiveStar from "../../../assets/images/FiveStar.svg";
import FourStar from "../../../assets/images/FourStar.svg";
import FourHalfStar from "../../../assets/images/FourHalfStar.svg";
import redRectangle from "../../../assets/images/redRectangle.svg";
import hp1 from "../../../assets/images/hp1.svg";
import hp2 from "../../../assets/images/hp2.svg";
import hp3 from "../../../assets/images/hp3.svg";
import hp4 from "../../../assets/images/hp4.svg";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../../store/productSlice";
// import { addToCart } from "../../../store/inventorySlice";
import { useNavigate } from "react-router-dom";


const productList = [
  {
    id: 1,
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
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
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
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 4,
    image: hp4,
    title: "S-Series Comfort Chair",
    newPrice: "$375",
    oldPrice: "$400",
    star: FourHalfStar,
    num: "(99)",
    description:
      "PLorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
];

const Sales = () => {
  // const products = useSelector((state) => state.inventory.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.id}`);
  };

  //To handle adding items to cart
  // const handleAddToCart = (id) => {
  //   dispatch(addToCart(id));
  //   navigate("/scart")
  // };
  return (
    <div>
      <section className="salesContainer">
        <FlashSales
          img1={<img src={redRectangle} alt="icon" />}
          text1="Today's"
          text2="Flash Sales"
          img2={<img src={dateImage} alt="image" />}
          img3
        />
        <div className="cards">

          {productList.map((product) => (
            <div key={product.id} onClick={() => handleClick(product)}>
              <Card
                image={<img src={product.image} alt={product.title} />}
                title={product.title}
                newPrice={product.newPrice}
                oldPrice={product.oldPrice}
                star={<img src={product.star} alt="ratings" />}
                num={product.num}
              />
            </div>
          ))}

        </div>
        <Button>View All Products</Button>
      </section>
    </div>
  );
};

export default Sales;
