import React from "react";
import { connect } from "react-redux";

class UnconnectedPasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: "" };
  }
  renderInputHeading = () => {
    if (this.props.isConfirmationField) {
      return "Re-enter Password";
    }
    return "Password";
  };
  OnChangeValue = event => {
    this.setState({ password: event.target.value });
    this.props.onChange(event);
  };
  render = () => {
    return (
      <>
        <p>{this.renderInputHeading()}</p>
        <input
          type={"password"}
          value={this.state.password}
          onChange={this.OnChangeValue}
          name={"password"}
        />
      </>
    );
  };
}

let PasswordInput = connect()(UnconnectedPasswordInput);
export default PasswordInput;
