import React from "react";
import { connect } from "react-redux";

class UnconnectedButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayMode: "" };
  }
  handleOnClick = () => {
    this.props.onClickCallback();
  };
  render = () => {
    return (
      <button onClick={this.handleOnClick}>{this.props.displayText}</button>
    );
  };
}

let Button = connect()(UnconnectedButton);
export default Button;
