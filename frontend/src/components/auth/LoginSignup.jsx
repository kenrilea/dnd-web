import React from "react";
import { connect } from "react-redux";

import proxy from "../../proxy.js";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";

import Button from "../primitive/Button.jsx";

class UnconnectedLoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMode: "Login",
      buttonText: "Sign up"
    };
  }
  toggleDisplayMode = () => {
    if (this.state.displayMode === "Login") {
      this.setState({
        displayMode: "Sign up",
        buttonText: "Login"
      });
      return;
    }
    this.setState({
      displayMode: "Login",
      buttonText: "Sign up"
    });
  };
  renderLoginSignup = () => {
    if (this.state.displayMode === "Sign up") {
      return <SignUp />;
    }
    return <Login />;
  };
  render = () => {
    if (this.props.loggedIn === true) {
      return <></>;
    }
    return (
      <div>
        <h5>{this.state.displayMode}</h5>
        {this.renderLoginSignup()}
        <p>Don't have an account?</p>
        <Button
          onClickCallback={this.toggleDisplayMode}
          displayText={this.state.buttonText}
        />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let LoginSignup = connect(mapStateToProps)(UnconnectedLoginSignup);
export default LoginSignup;
