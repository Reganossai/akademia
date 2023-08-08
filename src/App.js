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

import { ToastContainer } from "react-toastify";

function App() {

  return (
    
    <div className="App">
    <ToastContainer />
        <BrowserRouter>
          <Switch>
          <Route exact path="/">
              <Landingpage/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <Register/>
            </Route>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/admission">
              <Admission/>
            </Route>
            <Route path="/personal-information">
              <Personalinformation/>
            </Route>
            
            <Route path="/guardian-information">
              <Guardianinformation/>
            </Route>
            
            <Route path="/previous-education">
              <Previouseducation/>
            </Route>
            
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
