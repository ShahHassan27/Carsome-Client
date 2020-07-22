import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import moment from "moment";

const initialState = {
  user: null,
  date: moment(new Date()).format("dddd[,] MMMM DD[,] YYYY"),
  time: "10:00 am",
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  date: null,
  time: null,
  addDate: (userDate) => {},
  addTime: (userTime) => {},
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "TIME":
      return {
        ...state,
        time: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function addDate(userDate) {
    dispatch({
      type: "DATE",
      payload: userDate,
    });
  }

  function addTime(userTime) {
    dispatch({
      type: "TIME",
      payload: userTime,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        date: state.date,
        time: state.time,
        addDate,
        addTime,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
