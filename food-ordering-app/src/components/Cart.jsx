import { use } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context";

import Button from "./Button";
import Modal from "./Modal";
import { formatToNaira } from "../utils/currency-formatter";
import UserProgressContext from "../store/user-progress-context";

const CartModal = () => {
  const { cart, addToCart, removeFromCart } = use(CartContext);
  const progressCtx = use(UserProgressContext);
   const cartTotal = cart.reduce((totalPrice, item)=>{
        return totalPrice + (item.quantity * +item.price)
    }, 0)

    const handleCloseCart = () =>{
      progressCtx.hideCart()
    }

    const handleOpenCheckOut = () =>{
      progressCtx.showCheckout()
    }

  return createPortal(
    <Modal className="cart" open={progressCtx.progress === "cart"} onClose={progressCtx.progress === "cart"? handleCloseCart : null}>
        <h2>Your Cart</h2>
          <ul>
            {cart.map((item)=>(
              <li className="cart-item" key={item.id}>
                <p>
                  {item.name} - {item.quantity} x {formatToNaira(+item.price)}
                </p>
                <p className="cart-item-actions">
                  <Button onClick={() => removeFromCart(item.id)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => addToCart(item)}>+</Button>
                </p>
              </li>
          ))}
          </ul>
          <p className="cart-total">{formatToNaira(cartTotal)}</p>
      <div className="modal-actions">
        <Button className="text-button" onClick={handleCloseCart}>Cancel</Button>
         {cart.length > 0 && <Button className="button" onClick={handleOpenCheckOut}>Go to Checkout</Button>}
      </div>
    </Modal>
  , document.getElementById("modal"));
};

export default CartModal;
