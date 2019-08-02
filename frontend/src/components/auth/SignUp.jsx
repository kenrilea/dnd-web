import React from "react";
import { connect } from "react-redux";

import PasswordInput from "./PasswordInput.jsx";
import UsernameInput from "./UsernameInput.jsx";

import proxy from "../../proxy.js";
import passwordCheck from "../../helpers/passwordCheck.js";
import postSignup from "../../helpers/Fetches/postSignup.js";

class UnconnectedSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      signUpError: ""
    };
  }
  submitLogIn = event => {
    event.preventDefault();
    postSignup(
      this.state.username,
      this.state.password,
      this.state.confirmPassword
    ).then(response => {
      if (response.success === true) {
        this.props.dispatch({ type: "login" });
        return;
      }
      this.setState({ signUpError: response.result });
    });
  };
  OnChangeUsername = event => {
    this.setState({ username: event.target.value });
  };
  OnChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  OnChangeConfirmPassword = event => {
    this.setState({ confirmPassword: event.target.value });
  };
  render = () => {
    return (
      <div>
        <p>{this.state.signUpError}</p>
        <form onSubmit={this.submitLogIn}>
          <UsernameInput onChange={this.OnChangeUsername} />
          <PasswordInput onChange={this.OnChangePassword} />
          <PasswordInput
            onChange={this.OnChangeConfirmPassword}
            isConfirmationField={true}
          />
          <input type={"submit"} value={"Sign up!"} />
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { characterData: state.characterData };
};

let SignUp = connect(mapStateToProps)(UnconnectedSignUp);
export default SignUp;
