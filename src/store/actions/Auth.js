import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const checkAuthTimeOut = (expressionTime) => {
  return (dispatch) => {
    setTimeout(dispatch(logout, expressionTime * 1000));
  };
};

export const auth = (email, pass, isSignUp) => {
  return (dispatch) => {
    const authData = {
      email: email,
      password: pass,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjlys7hSGRZJri3AOwldNGZT7D59dLln4";

    if (isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjlys7hSGRZJri3AOwldNGZT7D59dLln4";
    }

    if (email !== "" && pass !== "") {
      dispatch(authStart());

      axios
        .post(url, authData)
        .then((response) => {
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem(
            "expirationDate",
            new Date(new Date().getTime() + response.data.expiresIn * 1000)
          );
          localStorage.setItem("userId", response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId));

          // dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch((error) => {
          dispatch(authFail(error.response.data.error));
        });
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        // dispatch(
        //   checkAuthTimeOut(
        //     (expirationDate.getTime() - new Date().getTime()) / 1000
        //   )
        // );
      } else {
        dispatch(logout());
      }
    }
  };
};
