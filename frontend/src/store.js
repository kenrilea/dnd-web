import { createStore } from "redux";
import reducer from "./reducer.js";
import characterData from "../assets/characterData.js";

const initialState = {
  stateExists: true,
  char: characterData,
  loggedIn: false
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
