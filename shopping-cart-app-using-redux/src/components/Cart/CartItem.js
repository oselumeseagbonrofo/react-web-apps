import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    const newTotal = price * (quantity + 1);
    dispatch(
      cartActions.increaseItemQuantity({
        item: {
          title,
          quantity,
          total: newTotal,
          price,
          description: props.item.description,
        },
        amount: 1,
      })
    );
  };

  const reduceQuantity = () => {
    if (quantity === 1) {
      dispatch(cartActions.removeItemFromCart(title));
    } else {
      dispatch(
        cartActions.reduceItemQuantity({
          title,
          quantity: quantity - 1,
          total,
          description: props.item.description,
        })
      );
    }
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={reduceQuantity}>-</button>
          <button onClick={increaseQuantity}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
