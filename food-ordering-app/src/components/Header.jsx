import { use } from "react"
import { CartContext } from "../store/cart-context";
import UserProgressContext from "../store/user-progress-context";

import logo from "../assets/logo.jpg"
import Button from "./Button";


const Header = () =>{
    const {cart} = use(CartContext);
    const progressCtx = use(UserProgressContext);

    const handleShowCart = () =>{
        progressCtx.showCart()
    }

    const totalCartItems = cart.reduce((totalNumberOfItems, item)=>{
        return totalNumberOfItems + item.quantity
    }, 0)

    return(
        <header id="main-header">
            <div id="title">
            <img alt="The Kitchen Logo" src={logo} />
            <h1 id="title">The Kitchen</h1>
            </div>
            <Button className="text-button center" onClick={handleShowCart}>Cart{totalCartItems > 0 ? `(${totalCartItems})` : undefined }</Button>
        </header>
    )
}

export default Header;