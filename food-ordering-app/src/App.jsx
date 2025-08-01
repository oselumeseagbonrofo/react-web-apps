import CartModal from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/cart-context";
import { UserProgressContextProvider } from "./store/user-progress-context";

const App = () => {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <main id="meals">
            <Meals />
          </main>
          <CartModal />
          <CheckOut />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
};

export default App;
