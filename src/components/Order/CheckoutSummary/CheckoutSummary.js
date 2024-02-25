import React from "react";
import Burger from "./../../Burger/Burger";
import Button from "./../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <div className="text-3xl font-extrabold p-5">It's taste Delicius</div>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredient={props.ingredient} />
      </div>
      <div className="flex justify-around w-[100%] p-10">
        <div>
          <Button btnType="Danger" clicked={props.cancelCheckout}>
            Cancel
          </Button>
        </div>
        <div>
          <Button btnType="Success" clicked={props.continueCheckout}>
            Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
