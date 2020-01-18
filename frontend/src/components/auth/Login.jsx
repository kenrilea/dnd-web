import React from "react";
import { connect } from "react-redux";

import PasswordInput from "./PasswordInput.jsx";
import UsernameInput from "./UsernameInput.jsx";

import postLogin from "../../helpers/Fetches/postLogin.js";

import proxy from "../../proxy.js";

class UnconnectedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", loginError: "" };
  }
  submitLogIn = event => {
    event.preventDefault();
    postLogin(this.state.username, this.state.password).then(response => {
      if (response.success === true) {
        this.props.dispatch({ type: "login" });
        return;
      }
      this.setState({ loginError: response.result });
    });
  };
  onChangeUsername = event => {
    this.setState({ username: event.target.value });
  };
  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  render = () => {
    return (
      <div>
        <p>{this.state.loginError}</p>
        <form onSubmit={this.submitLogIn}>
          <UsernameInput onChange={this.onChangeUsername} />
          <PasswordInput onChange={this.onChangePassword} />

          <input type={"submit"} value={"submit"} />
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { characterData: state.characterData };
};

let Login = connect(mapStateToProps)(UnconnectedLogin);
export default Login;
