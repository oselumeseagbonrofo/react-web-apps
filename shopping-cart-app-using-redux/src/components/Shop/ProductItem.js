import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { title, price, description } = props;
  const cart = useSelector((state) => state.cart.items)
  const dispatch = useDispatch();

  const existingItemIndex = cart.findIndex((item) => item.title === title)

  const addProductToCart = () =>{
    if(existingItemIndex !== -1){
      const currentQuantity = cart[existingItemIndex].quantity
      const newTotal = price * (currentQuantity + 1);
    dispatch(
      cartActions.increaseItemQuantity({
        item: {
          title,
          quantity: currentQuantity,
          total: newTotal,
          price,
          description,
        },
        amount: 1,
      })
    );
    }else{
      dispatch(cartActions.addItemToCart({title, price, description, quantity: 1}))
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addProductToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
