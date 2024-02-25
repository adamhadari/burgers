import React, { Fragment } from "react";
import Button from "./../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}: </span>
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3 className="p-3">Your Order</h3>
      <div className="p-3">
        <p>A Delicious Burger With Following Ingredients</p>
        <ul>{ingredients}</ul>
        <p>
          <strong>Total Price: {props.price.toFixed(2)}</strong>
        </p>
      </div>
      <p className="p-3">Continue to Checkout?</p>
      <div className="flex justify-around w-[100%] p-10">
        <div>
          <Button btnType="Danger" clicked={props.cancelOrder}>
            Cancel
          </Button>
        </div>
        <div>
          <Button btnType="Success" clicked={props.continueOrder}>
            Continue
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSummary;
