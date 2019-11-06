import React, { Component } from "react";

class CashTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copper: this.props.cash.copper,
      silver: this.props.cash.silver,
      gold: this.props.cash.gold
    };
  }
  render = () => {
    return (
      <div>
        <div className="money-style">copper</div>
        <div className="money-style">silver</div>
        <div className="money-style">gold</div>
      </div>
    );
  };
}
export default CashTracker;
