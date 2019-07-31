import React from "react";
import { connect } from "react-redux";

import proxy from "../proxy.js";

class UnconnectedAutoLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    if (this.props.loggedIn) {
      return;
    }
    fetch(proxy + "/auto-login", {
      method: "POST",
      credentials: "include"
    })
      .then(response => {
        return response.text();
      })
      .then(resBody => {
        let parsedBody = JSON.parse(resBody);
        if (parsedBody.success) {
          this.props.dispatch({ type: "login" });
        }
      });
  };
  render = () => {
    return <div />;
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let AutoLogin = connect(mapStateToProps)(UnconnectedAutoLogin);
export default AutoLogin;
