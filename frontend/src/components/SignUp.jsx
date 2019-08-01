import React from "react";
import { connect } from "react-redux";

import proxy from "../proxy.js";
import passwordCheck from "../helpers/passwordCheck.js";

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
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        signUpError: "passwords did not match",
        confirmPassword: ""
      });
      return;
    }
    if (!passwordCheck(this.state.password)) {
      this.setState({
        signUpError:
          "Password must be 7 or more characters long and contain one lowercase letter, one number, on upper case letter"
      });
      return;
    }
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    fetch(proxy + "/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        const parsedBody = JSON.parse(resBody);
        if (!parsedBody.success) {
          this.setState({ signUpError: parsedBody.result });
          return;
        } else {
          console.log(parsedBody);
          this.props.dispatch({ type: "login" });
          this.setState({ username: "", password: "", confirmPassword: "" });
        }
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
          <label>
            Confirm password:
            <input
              type={"password"}
              value={this.state.confirmPassword}
              onChange={this.OnChangeConfirmPassword}
              name={"confirmPassword"}
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

let SignUp = connect(mapStateToProps)(UnconnectedSignUp);
export default SignUp;
