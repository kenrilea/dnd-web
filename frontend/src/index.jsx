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
import CharacterSelect from "./views/character-select/CharacterSelect.jsx";
import SpellViewer from "./views/character-sheet/SpellViewer.jsx";
import CharacterForm from './views/character-form/characterform.jsx';
import CharacterList from './views/character-form/CharacterList.jsx';
import CharacterViewer from './views/character-form/CharacterViewer.jsx';

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
          path="/character-sheet/:id"
          component={CharacterSheet}
        />
        <Route exact={true} path="/create" component={CharCreator} />
        <Route
          exact={true}
          path="/character/select"
          component={CharacterSelect}
        />
        <Route exact={true} path="/spells" component={SpellViewer} />
        <Route exact={true} path='/basic/add' component={CharacterForm} />
        <Route exact={true} path='/basic/list' component={CharacterList} />
        <Route exact={true} path='/basic/character/:_id' component={CharacterViewer} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById("root"));
