import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import ProtectedRoute from "./util/ProtectedRoute";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ProtectedRoute exact path="/" component={Home} />
        <AuthRoute exact path="/signin" component={SignIn} />
        <AuthRoute exact path="/signup" component={SignUp} />
      </Router>
    </AuthProvider>
  );
}

export default App;
