import React from "react";
import { connect } from "react-redux";

import proxy from "../../proxy.js";
import Button from "../primitive/Button.jsx";

class UnconnectedLogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogOutClick = () => {
    console.log("logging out");
    document.cookie = "sid=undefined";
    this.props.dispatch({ type: "logout" });
  };
  render = () => {
    if (this.props.loggedIn === true) {
      return (
        <>
          <p>Logged in</p>
          <Button
            onClickCallback={this.handleLogOutClick}
            displayText={"Log out"}
          />
        </>
      );
    }
    return <></>;
  };
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let LogoutButton = connect(mapStateToProps)(UnconnectedLogoutButton);
export default LogoutButton;
