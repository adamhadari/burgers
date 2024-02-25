import React, { Component } from "react";
// import WithErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
// import axios from "./../../axios-orders";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import axios from "axios";
import Button from "../../components/UI/Button/Button";
import ContactData from "../Checkout/ContactData/ContactData";
class TopSelling extends Component {
  state = {
    loading: true,
    burgers: [],
    continuetoCheckout: false,
    generatedBurger: null,
  };
  orderitnow = () => {
    this.props.onChangePrice(this.state.generatedBurger.price);
    let ings = {};
    this.state.generatedBurger.ingredients.map((ing) => {
      ings[ing] = 1;
    });
    console.log(ings);
    this.props.onChangeIngs({ ...ings });
    this.setState({ continuetoCheckout: true });
  };
  generate = () => {
    this.setState({ continuetoCheckout: false });
    this.setState({ loading: true });
    setTimeout(() => {
      let randomElement =
        this.state.burgers[
          Math.floor(Math.random() * this.state.burgers.length)
        ];
      randomElement["price"] = Math.floor(Math.random() * 11);
      this.setState({ generatedBurger: randomElement }, () => {
        console.log(this.state.generatedBurger);
        this.setState({ loading: false });
      });
    }, 1000);
  };
  componentDidUpdate(prevProps) {}
  componentDidMount() {
    axios
      .get("https://my-burger-api.herokuapp.com/burgers")
      .then((response) => {
        if (response && response.data) {
          this.setState({ loading: false });
          this.setState({ burgers: response.data });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="random-page flex items-center justify-center w-[100%]">
        {this.state.loading ? (
          <div className="p-5">
            <Spinner />
          </div>
        ) : (
          <div className=" p-5 flex flex-col items-center justify-center w-[100%]">
            <div className="text-xl font-bold text-center ">
              Generate,order,eat - our random menu is here.
              <div>It's simple, try it now!</div>
            </div>
            {this.state.loading ? (
              <div className="p-5">
                <Spinner />
              </div>
            ) : (
              <div className="flex flex-col justiy-center items-center border ">
                <div className="p-5">
                  <Button
                    style={{ padding: "0" }}
                    btnType="Danger"
                    clicked={this.generate}
                  >
                    I'M HUNGRY, GENERATE A BURGER!
                  </Button>
                  <hr className="w-[100%]" />
                </div>
                {this.state.generatedBurger ? (
                  <div className="flex flex-col justify-center items-center border-[1px]">
                    <div className="p-2 font-extrabold text-xl">
                      {this.state.generatedBurger.name}
                    </div>
                    <div className="p-2 italic">
                      {this.state.generatedBurger.description}
                    </div>{" "}
                    ingredients:
                    <div className="p-2 font-light">
                      <ul>
                        {this.state.generatedBurger.ingredients.map((ing) => {
                          return <li>{ing}</li>;
                        })}
                      </ul>
                    </div>
                    <div className="p-10 font-extrabold">
                      Price: {this.state.generatedBurger.price} USD
                    </div>
                    <Button
                      style={{ padding: "20px" }}
                      btnType="Success"
                      clicked={this.orderitnow}
                    >
                      ORDER IT NOW
                    </Button>
                    <hr />
                    {this.state.continuetoCheckout ? (
                      <div>
                        <ContactData />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredient,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
    onRemoveIngredient: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onChangePrice: (price) => dispatch(actions.changePrice(price)),
    onChangeIngs: (ings) => dispatch(actions.changeIngs(ings)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopSelling);
