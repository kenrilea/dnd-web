import React from "react";
import { connect } from "react-redux";

class UnconnectedButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    return <div className={"container_page_default"} />;
  };
}

let Button = connect()(UnconnectedButton);
export default Button;
