import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import React, { Component } from "react";

import { Provider, connect } from "react-redux";
import store from "./store.js";

import "./styles/main.css";
import "./styles/resetDefaults.css";
import "./styles/stats.css";

import App from "./components/App.jsx";

import LandingPage from "./views/landing-page/LandingPage.jsx";
import AutoLogin from "./components/auth/AutoLogin.jsx";
import MonsterManager from "./views/monster-manager/MonsterManager.jsx";
import CharacterSheet from "./views/character-sheet/CharacterSheet.jsx";
import CharCreator from "./views/character-creator/CharCreator.jsx";

let root = (
  <Provider store={store}>
    <AutoLogin />
    <BrowserRouter>
      {/*---------------- exact FALSE routes here --------------*/}
      <Switch>
        {/*---------------- exact TRUE routes here --------------*/}
        <Route exact={true} path={"/"} component={LandingPage} />
        <Route
          exact={true}
          path={"/monster-manager"}
          component={MonsterManager}
        />
        <Route
          exact={true}
          path="/character-sheet"
          component={CharacterSheet}
        />
        <Route exact={true} path="/create" component={CharCreator} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById("root"));
