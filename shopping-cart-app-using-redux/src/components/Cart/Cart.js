import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.map((item)=>{
          const total = item.price * item.quantity
          return(
          <CartItem key={item.title}
            item={{...item, total}} />)
        })}
      
      </ul>
    </Card>
  );
};

export default Cart;
