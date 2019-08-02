import React from "react";
import { connect } from "react-redux";

class UnconnectedUsernameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  onChangeValue = event => {
    this.setState({ username: event.target.value });
    this.props.onChange(event);
  };
  render = () => {
    return (
      <>
        <p>Username</p>
        <input
          type={"text"}
          value={this.state.username}
          onChange={this.onChangeValue}
          name={"username"}
        />
      </>
    );
  };
}

let UsernameInput = connect()(UnconnectedUsernameInput);
export default UsernameInput;
