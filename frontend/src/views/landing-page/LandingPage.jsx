import React from "react";
import { connect } from "react-redux";

import Login from "../../components/Login.jsx";
import SignUp from "../../components/SignUp.jsx";

import proxy from "../../proxy.js";

class UnconnectedLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  submitLogIn = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    console.log(this.state.username + this.state.password);
    console.log(event);
    fetch(proxy + "/login", { method: "POST", body: data });
  };
  OnChangeUsername = event => {
    this.setState({ username: event.target.value });
  };
  OnChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleLogOutClick = () => {
    console.log("logging out");
    document.cookie = "sid=undefined";
    this.props.dispatch({ type: "logout" });
  };
  renderLoginSignUp = loggedIn => {
    if (loggedIn !== false) {
      return (
        <div>
          Logged In
          <button onClick={this.handleLogOutClick}>Log out</button>
        </div>
      );
    }
    return (
      <div>
        <Login />
        <SignUp />
      </div>
    );
  };
  render = () => {
    return <div>{this.renderLoginSignUp(this.props.loggedIn)}</div>;
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let LandingPage = connect(mapStateToProps)(UnconnectedLandingPage);
export default LandingPage;
