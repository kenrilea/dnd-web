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

  render = () => {
    return (
      <>
        <div>
          <LoginSignUp />
          <LogoutButton />
        </div>
      </>
    );
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let LandingPage = connect(mapStateToProps)(UnconnectedLandingPage);
export default LandingPage;
