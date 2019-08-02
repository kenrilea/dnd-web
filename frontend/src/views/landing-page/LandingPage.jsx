import React from "react";
import { connect } from "react-redux";

import LogoutButton from "../../components/auth/LogoutButton.jsx";
import LoginSignUp from "../../components/auth/LoginSignup.jsx";

import proxy from "../../proxy.js";

class UnconnectedLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogOutClick = () => {
    console.log("logging out");
    document.cookie = "sid=undefined";
    this.props.dispatch({ type: "logout" });
  };
  renderLoginSignUp = loggedIn => {
    if (loggedIn !== false) {
      return <></>;
    }
    return <LoginSignUp />;
  };
  render = () => {
    return (
      <>
        <div>
          <LogoutButton />
        </div>
        {this.renderLoginSignUp(this.props.loggedIn)}
      </>
    );
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let LandingPage = connect(mapStateToProps)(UnconnectedLandingPage);
export default LandingPage;
