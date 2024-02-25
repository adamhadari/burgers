import * as actionTypes from "./actionTypes";
import axios from "./../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};
export const changePrice = (price) => {
  return {
    type: actionTypes.CHANGE_PRICE,
    price: price,
  };
};
export const changeIngs = (ings) => {
  return {
    type: actionTypes.CHANGE_INGS,
    ings: ings,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ingredient) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredient,
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get("https://my-burger-71203-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json")
      .then((response) => dispatch(setIngredient(response.data)))
      .catch((error) => dispatch(fetchIngredientFailed()));
  };
};
