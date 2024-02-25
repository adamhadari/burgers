import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import Spinner from "../../../components/UI/Spinner/Spinner";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function PaymentForm(props) {
  const [loading, setLoading] = React.useState(false);
  const handleToken = async (token, adresses) => {
    setLoading(true);
    const res = await axios.post("https://ed6l3.sse.codesandbox.io/checkout", {
      token,
    });
    const { status } = res.data;
    if (status) {
      toast("Success ! Check orders page!", {
        type: "success",
      });
      setLoading(false);
      props.changePayed(true);
    } else {
      toast("Something went wrong", {
        type: "failure",
      });
      setLoading(false);
    }
  };
  return (
    <div className="App">
      {loading ? (
        <Spinner />
      ) : (
        <StripeCheckout
          stripeKey="pk_test_51JGNLWBVnEa8wQ1y8ZGMn9tw57qHCROwaNVr5eplb1UvQsN410gJpXPyNW8yFgNQZeM7twAoAjZ7LosccszLnDMz00pIIh0lL0"
          token={handleToken}
          billingAddress
          shippingAddress
          amount={50 * 100}
          name="My Burger"
        />
      )}
    </div>
  );
}
