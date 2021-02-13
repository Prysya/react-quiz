import axios from "axios";

import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";

const authSuccess = (token) => ({ type: AUTH_SUCCESS, token });

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");

  return { type: AUTH_LOGOUT };
};

const autoLogout = (time) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, time * 1000);
};

const auth = (email, password, isLogin) => async (dispatch) => {
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtjrq5Xil1Up97V81SldoTDrhmkf2ZkOw";

  if (isLogin) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtjrq5Xil1Up97V81SldoTDrhmkf2ZkOw";
  }

  try {
    const res = await axios.post(url, authData);
    const data = res.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  } catch (err) {
    console.warn(err);
  }
};

const autoLogin = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};

export default auth;
export { logout, authSuccess, autoLogout, autoLogin };
