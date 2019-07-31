import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./store.js";

import "./styles/main.css";
import "./styles/resetDefaults.css";

import App from "./components/App.jsx";

import LandingPage from "./views/landing-page/LandingPage.jsx";
import AutoLogin from "./components/AutoLogin.jsx";

let root = (
  <Provider store={store}>
    <AutoLogin />
    <BrowserRouter>
      {/*---------------- exact FALSE routes here --------------*/}
      <Switch>
        {/*---------------- exact TRUE routes here --------------*/}
        <Route exact={true} path={"/"} component={LandingPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById("root"));
