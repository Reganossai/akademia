import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admission from "./pages/Admission";
import Personalinformation from "./components/Personalinformation";
import Guardianinformation from "./components/Guardianinformation";
import Previouseducation from "./components/Previouseducation";
import Landingpage from "./pages/Landingpage";
import { connect } from "react-redux";
import { saveAuthToken } from "./redux/Auth/auth-actions";

import { ToastContainer } from "react-toastify";

function App({ token, saveToken }) {

  const setUserTokenToReduxStateFromLocalStorage = useCallback(() => {
    const storedToken = localStorage.getItem("user-token");
    if (storedToken) {
      saveToken(storedToken);
    }
  }, [saveToken]);

  return (
    <div className="App">
      <ToastContainer />
      {token ? (
        <div>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admission">
              <Admission />
            </Route>
            <Route path="/personal-information">
              <Personalinformation />
            </Route>

            <Route path="/guardian-information">
              <Guardianinformation />
            </Route>

            <Route path="/previous-education">
              <Previouseducation />
            </Route>
          </Switch>
        </BrowserRouter>
        </div>
      ) : (

        <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Landingpage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
        </div>
      )}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveToken: (token) => dispatch(saveAuthToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
