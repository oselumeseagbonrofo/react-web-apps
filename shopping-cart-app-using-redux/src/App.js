import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isVisible);
  const cart = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.cart.notification);
  const isChanged = useSelector((state) => state.cart.changed);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (isChanged){
          dispatch(sendCartData(cart));
    }
  }, [cart, dispatch, isChanged]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {isVisible ? <Cart /> : null}
        <Products />
      </Layout>
    </>
  );
}

export default App;
