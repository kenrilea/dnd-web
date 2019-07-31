import React from "react";
import { connect } from "react-redux";

import proxy from "../proxy.js";

class UnconnectedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", loginError: "" };
  }
  submitLogIn = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    console.log(this.state.username + this.state.password);
    fetch(proxy + "/login", {
      method: "POST",
      credentials: "include",
      body: data
    })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        const parsedBody = JSON.parse(resBody);
        if (!parsedBody.success) {
          this.setState({ loginError: parsedBody.result });
          return;
        } else {
          this.setState({ username: "", password: "" });
          this.props.dispatch({ type: "login" });
        }
      });
  };
  OnChangeUsername = event => {
    this.setState({ username: event.target.value });
  };
  OnChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  render = () => {
    return (
      <div>
        <p>{this.state.loginError}</p>
        <form onSubmit={this.submitLogIn}>
          <label>
            Username:{" "}
            <input
              type={"text"}
              value={this.state.username}
              onChange={this.OnChangeUsername}
              name={"username"}
            />
          </label>
          <label>
            Password:
            <input
              type={"password"}
              value={this.state.password}
              onChange={this.OnChangePassword}
              name={"password"}
            />
          </label>
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
