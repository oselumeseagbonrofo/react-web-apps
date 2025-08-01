import { createContext, useReducer } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: (item) => {},
  removeFromCart: (id) => {},
});

const cartReducer = (state, action) => {
  if (action.type === "add_item") {
    const existingCartItemIndex = state.findIndex(
      (item) => item.id === action.payload.id
    );

    const updatedItems = [...state];

    if (existingCartItemIndex > -1) {
      const existingItem = state[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.payload, quantity: 1 });
    }
    return updatedItems;
  }
  if (action.type === "remove_item") {
    const existingCartItemIndex = state.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    
    const existingCartItem = state[existingCartItemIndex];

    const updatedItems = [...state];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return updatedItems;
  }

  if (action.type === "clear_cart"){
    return ([])
  }

  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  // Add items to cart
  const addToCart = (item) => {
    cartDispatch({
      type: "add_item",
      payload: item,
    });
  };

  const removeFromCart = (id) =>{
    cartDispatch({
      type: "remove_item",
      payload: id,
    })
  }

  const clearCart = () =>{
    cartDispatch({
      type: "clear_cart",
    })
  }

  // Place order
  // const addToCart = async (selectedOrderItem) =>{
  //   const response = await fetch('http://localhost:3000/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(selectedOrderItem),
  //   });

  //   if (!response.ok) {
  //     return;
  //   }

  //   const savedOrderItem = await response.json();
  //   setOpinions((prevOrders) => [savedOrderItem, ...prevOrders]);
  // }

  const contextvalue = {
    cart: cartState,
    addToCart,
    removeFromCart,
    clearCart
  };

  return <CartContext value={contextvalue}>{children}</CartContext>;
};

export default CartContextProvider;
