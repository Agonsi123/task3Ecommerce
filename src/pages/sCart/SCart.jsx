import React from 'react';
import './sCart.scss';
// import scart1 from '../../assets/images/scart1.svg';
// import scart2 from "../../assets/images/scart2.svg";
import Button from '../../components/buttons/Button';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, checkout, setQuantity, clearCart } from '../../store/inventorySlice';
import { useNavigate } from 'react-router-dom';



const SCart = () => {
  const cart = useSelector((state) => state.inventory.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle removing items from the cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculate Sub-Total using reduce()
  // const cartSubtotal = cart.reduce((total, item) => {
  //   return total + item.price * item.quantity;
  // }, 0);

  const subtotal = useSelector((state) => state.inventory.subtotal);
  const total = useSelector((state) => state.inventory.total);

  //To handle clear cart
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  // To handle checkout
  const handleCheckOut = () =>{
    dispatch(checkout());
    alert("You have successfully checked out of your cart ");
    navigate("/")
  };

  // Handle Change in quantity of product in cart
  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) {
      dispatch(removeFromCart(id));
    }else {
      dispatch(setQuantity({ id, quantity: newQty }));
    }
  };


  return (
    <div className="scartContainer">
      <p className="roadMap">Home / Cart</p>
      <div className="scarttop">
        <div className="scartDetail">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="detailTitle">
                <div className="scartProd">Product</div>
                <div className="scartProd">Price</div>
                <div className="scartProd">Quantity</div>
                <div className="scartProd1">Subtotal</div>
                <div className="scartProd1">Action</div>
              </div>
              <div className="detailTitle2">
                {cart.map((item) => (
                  <div className="detailTitle" key={item.id}>
                    <div className="scartProduct">
                      <img src={item.image} alt={item.title} />
                      <p>{item.title}</p>
                    </div>
                    <div className="scartProd">{item.price}</div>
                    <div className="scartProd">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQtyChange(item.id, parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="scartProd1">${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="scartProd1">
                      <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="scartDCont">
          <button onClick={() => navigate("/")}>Return To Shop</button>
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      </div>
      <div className="scartbottom">
        <div className="couponContainer">
          <div className="coupon">
            <input type="text" name="" id="" placeholder="Coupon Code" />
          </div>
          <div className="couponBtn">
            <button>Apply Coupon</button>
          </div>
        </div>
        <div className="cartTotal">
          <p>Cart Total</p>
          <div className="subtotal">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="subtotal">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="subtotal">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <Button onClick={handleCheckOut}>Proceed to checkout</Button>
        </div>
      </div>
    </div>
  );
}

export default SCart