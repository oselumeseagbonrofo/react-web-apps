import { use } from "react";
import { CartContext } from "../store/cart-context";
import { formatToNaira } from "../utils/currency-formatter";
import Button from "./Button";

const Meal = ({meal}) => {
    const {addToCart} = use(CartContext);
  return(
    <article className="meal-item">
      <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
      <h3>{meal.name}</h3>
      <p className="meal-item-price">{formatToNaira(+meal.price)}</p>
      <p className="meal-item-description">{meal.description}</p>
      <Button className="meal-item-actions button" onClick={() => addToCart(meal)}>Add to Cart</Button>
    </article>
  )
};

export default Meal;
