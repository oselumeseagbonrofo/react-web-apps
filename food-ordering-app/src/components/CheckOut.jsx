import { use, useActionState } from "react";
import useHttp from "../hooks/useHttp";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import Error from "./Error";
import { CartContext } from "../store/cart-context";
import UserProgressContext from "../store/user-progress-context";
import { formatToNaira } from "../utils/currency-formatter";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const CheckOut = () => {
  const { cart, clearCart } = use(CartContext);
  const { progress, hideCheckout } = use(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cart.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * +item.price;
  }, 0);

  const handleCloseCheckOut = () => {
    hideCheckout();
  };

  const handleFinish = () =>{
    hideCheckout();
    clearCart();
    clearData();
  }

  const checkoutAction = async (prevState, fd) => {
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    await sendRequest(
      JSON.stringify({
        order: {
          items: cart,
          customer: customerData,
        },
      })
    );
  };

  const [formState, formAction, pending] = useActionState(checkoutAction, []);

  let actions = (
    <>
      <Button
        className="text-button"
        onClick={handleCloseCheckOut}
        type="button"
      >
        Cancel
      </Button>
      <Button className="button">Submit Order</Button>
    </>
  );

  if (pending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error){
    return (<Modal open={progress === "checkout"} onClose={handleFinish}>
      <h2>Success!</h2>
              <p>Your order was submitted successfully.</p>
              <p>
                We will get back to you with more details via email within the next
                few minutes.
              </p>
              <p className="modal-actions">
                <Button className="button" onClick={handleFinish}>Okay</Button>
              </p>
    </Modal>
    )
  }

  return (
    <Modal
      onSubmit={formAction}
      open={progress === "checkout"}
      onClose={progress === "checkout" ? handleCloseCheckOut : null}
    >
      <form action={formAction} className="control">
        <h2>Checkout</h2>
        <p>Total amount: {formatToNaira(cartTotal)}</p>
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="Email" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default CheckOut;
