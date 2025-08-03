import React from "react";
import "./exploreProducts.scss";
import FlashSales from "../../flashSales/FlashSales";
import Card3 from "../../cards/card3/Card3";
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
import fillEye from "../../../assets/images/fillEye.svg";
import fillHeart from "../../../assets/images/fillHeart.svg";
import colourChange1 from "../../../assets/images/colourChange1.svg";
import colourChange2 from "../../../assets/images/colourChange2.svg";
import colourChange3 from "../../../assets/images/colourChange3.svg";
import colourChange4 from "../../../assets/images/colourChange4.svg";
import Button from "../../buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct, addToWishlist, removeFromWishlist } from "../../../store/productSlice";
import { addToCart } from "../../../store/inventorySlice";
import { useNavigate } from "react-router-dom";

const productList = [
  {
    id: 1,
    eye: fillEye,
    heart: fillHeart,
    image: eop1,
    title: "Breed Dry Dog Food",
    newPrice: "$100",
    star: ThreeStar,
    num: "(35)",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis",
  },
  {
    id: 2,
    eye: fillEye,
    heart: fillHeart,
    image: eop2,
    title: "CANON EOS DSLR Camer",
    newPrice: "$360",
    star: FourStar,
    num: "(55)",
    btn: "Add To Cart",
    description:
      "Comes in various sizes and styles, with features like secure zipper closure, top handles, and adjustable shoulder straps.",
  },
  {
    id: 3,
    eye: fillEye,
    heart: fillHeart,
    image: eop3,
    title: "ASUS FHD Gaming Laptop",
    newPrice: "$700",
    star: FiveStar,
    num: "(325)",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 4,
    eye: fillEye,
    heart: fillHeart,
    image: eop4,
    title: "Curology Product Set",
    newPrice: "$500",
    star: FourStar,
    num: "(1455)",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 5,
    text: "New",
    eye: fillEye,
    heart: fillHeart,
    image: eop5,
    title: "Kids Electric Car",
    newPrice: "$960",
    star: FiveStar,
    num: "(65)",
    color: colourChange1,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 6,
    eye: fillEye,
    heart: fillHeart,
    image: eop6,
    title: "Jr. Zoom Soccer Cleats",
    newPrice: "$1160",
    star: FiveStar,
    num: "(35)",
    color: colourChange2,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 7,
    text: "New",
    eye: fillEye,
    heart: fillHeart,
    image: eop7,
    title: "GP11 Shooter USB Gamepad",
    newPrice: "$660",
    star: FourHalfStar,
    num: "(55)",
    color: colourChange3,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis exercitationem recusandae dicta praesentium omnis? Fugit at hic debitis ipsum eius velit numquam omnis.",
  },
  {
    id: 8,
    eye: fillEye,
    heart: fillHeart,
    image: eop8,
    title: "Quilted Satin Jacket",
    newPrice: "$660",
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
  const wishlist = useSelector((state) => state.product.wishlist);

  // Handle view items in product details
  const handleClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.id}`);
  };

  // Handle add to wishlist
  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
      navigate("/wishlist");
    }
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
    <section className="exploreContainer">
      <FlashSales
        img1={<img src={redRectangle} alt="icon" />}
        text1="Our Products"
        text2="Explore Our Products"
        // img2={<img src={dateImage} alt="image" />}
        img3={<img src={rightandLeftarrow} alt="Right and Left Arrows" />}
      />
      <div className="cards3">
        {upperProductList.map((product) => {
          const isWishlisted = isInWishlist(product.id);

          return (
            <div key={product.id}>
              <Card3
                eye={<img src={product.eye} alt="see details" />}
                heart={
                  !isWishlisted ? (
                    <img
                      src={product.heart}
                      alt="Add to wishlist"
                      onClick={() => handleWishlistToggle(product)}
                    />
                  ) : null
                }
                trash={
                  isWishlisted ? (
                    <span onClick={() => handleWishlistToggle(product)}>
                      <img src={product.heart} alt="trash Icon" />
                    </span>
                  ) : null
                }
                image={<img src={product.image} alt={product.title} />}
                title={product.title}
                newPrice={product.newPrice}
                star={<img src={product.star} alt="ratings" />}
                num={product.num}
                btn={product.btn}
                onEyeClick={() => handleClick(product)}
                onButtonClick={() => handleAddToCart(product)}
              />
            </div>
          );
        })}
      </div>
      <div className="cards3">
        {lowerProductList.map((product) => {
          const isWishlisted = isInWishlist(product.id);

          return (
            <div key={product.id}>
              <Card3
                text={product.text}
                eye={<img src={product.eye} alt="eye icon" />}
                heart={
                  !isWishlisted ? (
                    <img
                      src={product.heart}
                      alt="Add to wishlist"
                      onClick={() => handleWishlistToggle(product)}
                    />
                  ) : null
                }
                trash={
                  isWishlisted ? (
                    <span onClick={() => handleWishlistToggle(product)}>
                      <img src={product.heart} alt="trash Icon" />
                    </span>
                  ) : null
                }
                image={<img src={product.image} alt={product.title} />}
                title={product.title}
                newPrice={product.newPrice}
                star={<img src={product.star} alt="ratings" />}
                num={product.num}
                color={<img src={product.color} alt="color change" />}
                onEyeClick={() => handleClick(product)}
              />
            </div>
          );
        })}
      </div>
      <Button>View All Products</Button>
    </section>
  );
};

export default ExploreProducts;
