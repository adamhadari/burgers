import React, { Component } from "react";
import Order from "./../../components/Order/Order";
// import WithErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
// import axios from "./../../axios-orders";
import { connect } from "react-redux";
import Spinner from "./../../components/UI/Spinner/Spinner";
import * as actions from "./../../store/actions/index";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      bacon: true,
      meat: true,
      salad: true,
      cheese: true,
    };
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.orders);
    if (
      this.props.orders &&
      this.props.orders.length > 0 &&
      prevProps.orders !== this.props.orders
    ) {
      let neworders = this.props.orders.map((order) => {
        return (
          <Order
            keyItem={order.id}
            ingredient={order.ingredient}
            price={+order.price}
          />
        );
      });
      this.setState({ orders: neworders });
    }
  }
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  filter(filter) {
    let neworders = this.props.orders.map((order) => {
      let show = true;
      Object.keys(order.ingredient).map((ing) => {
        if (
          order.ingredient[ing] > 0 &&
          ing in this.state &&
          !this.state[ing]
        ) {
          show = false;
        }
      });
      if (show) {
        return (
          <Order
            key={order.id}
            ingredient={order.ingredient}
            price={+order.price}
          />
        );
      }
    });
    this.setState({ orders: neworders });
  }
  render() {
    return (
      <div className="orders-page">
        {this.state.orders.length > 0 ? (
          <div>
            <div className="filters flex justify-center items-center w-[100%]">
              Filter :
              <div className="p-2">
                <input
                  key="bacon"
                  type="checkbox"
                  name="bacon"
                  checked={this.state.bacon}
                  onChange={() => {
                    this.setState({ bacon: !this.state.bacon }, () => {
                      this.filter();
                    });
                  }}
                />{" "}
                Bacon
              </div>
              <div className="p-2">
                <input
                  key="cheese"
                  type="checkbox"
                  name="cheese"
                  checked={this.state.cheese}
                  onChange={() => {
                    this.setState({ cheese: !this.state.cheese }, () => {
                      this.filter();
                    });
                  }}
                />{" "}
                Cheese
              </div>
              <div className="p-2">
                <input
                  key="meat"
                  type="checkbox"
                  name="meat"
                  checked={this.state.meat}
                  onChange={() => {
                    this.setState({ meat: !this.state.meat }, () => {
                      this.filter();
                    });
                  }}
                />{" "}
                Meat
              </div>
              <div className="p-2">
                <input
                  key="salad"
                  type="checkbox"
                  name="salad"
                  checked={this.state.salad}
                  onChange={() => {
                    this.setState({ salad: !this.state.salad }, () => {
                      this.filter();
                    });
                  }}
                />{" "}
                Salad
              </div>
            </div>
            {this.state.orders}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
