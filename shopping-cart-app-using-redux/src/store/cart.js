import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isVisible: false,
  notification: null,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      state.items = [...state.items, action.payload];
      state.changed = true;
    },
    removeItemFromCart(state, action) {
      const newItems = state.items.filter(
        (item) => item.title !== action.payload
      );
      state.items = newItems;
      state.changed = true;

      //state.items.pop(state.items[id])
    },
    increaseItemQuantity(state, action) {
      const id = state.items.findIndex(
        (item) => item.title === action.payload.item.title
      );

      state.items[id].quantity =
        state.items[id].quantity + action.payload.amount;
      state.changed = true;
    },
    reduceItemQuantity(state, action) {
      const id = state.items.findIndex(
        (item) => item.title === action.payload.title
      );

      state.items[id].quantity = state.items[id].quantity - 1;
      state.changed = true;
    },
    showCart(state) {
      state.isVisible = true;
    },
    hideCart(state) {
      state.isVisible = false;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const cartActions = cartSlice.actions;

const cartSliceReducer = cartSlice.reducer;

export default cartSliceReducer;
