import { useSelector, useDispatch } from "react-redux";

import { cartActions } from "../../store/cart";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const cart = useSelector((state) => state.cart.items);
  const isVisible = useSelector((state) => state.cart.isVisible);
  const dispatch = useDispatch();
  const toggleCartModal = () => {
    if (isVisible) {
      dispatch(cartActions.hideCart());
    } else {
      dispatch(cartActions.showCart());
    }
  };
  const totalItemsInCart = cart.reduce((total, item)=>{
    return total + item.quantity
  }, 0 )
  return (
    <button onClick={toggleCartModal} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItemsInCart}</span>
    </button>
  );
};

export default CartButton;
