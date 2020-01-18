import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import LogoutButton from "../../components/auth/LogoutButton.jsx";
import LoginSignUp from "../../components/auth/LoginSignup.jsx";

import proxy from "../../proxy.js";

class UnconnectedLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    const { loggedIn } = this.props;
    return (
      <>
        <LoginSignUp />
        <LogoutButton />
        {loggedIn &&(
          <Link to='/character-sheet'>Character sheet</Link>
        )}
      </>
    );
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let LandingPage = connect(mapStateToProps)(UnconnectedLandingPage);
export default LandingPage;
