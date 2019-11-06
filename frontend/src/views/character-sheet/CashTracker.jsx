import React, { Component } from "react";
import { connect } from "react-redux";

class DisconnectCashTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copper: this.props.copper,
      silver: this.props.silver,
      gold: this.props.gold
    };
  }

  addCopper = event => {};
  subCopper = event => {};

  addSilver = event => {};
  subSilver = event => {};

  addGold = event => {};
  subGold = event => {};

  render = () => {
    return (
      <div className="cash-wrapper">
        <div className="cash-style copper-border">
          copper<div className="char-race">{this.state.copper}</div>
          <div className="stat-wrapper">
            <button className="cash-button copper-border">+</button>
            <button className="cash-button copper-border">-</button>
          </div>
        </div>
        <div className="cash-style silver-border">
          silver<div className="char-race">{this.state.silver}</div>
          <div className="stat-wrapper">
            <button className="cash-button silver-border">+</button>
            <button className="cash-button silver-border">-</button>
          </div>
        </div>
        <div className="cash-style gold-border">
          gold<div className="char-race">{this.state.gold}</div>
          <div className="stat-wrapper">
            <button className="cash-button gold-border">+</button>
            <button className="cash-button gold-border">-</button>
          </div>
        </div>
      </div>
    );
  };
}

const mapState = state => {
  return {
    copper: state.char.cash.copper,
    silver: state.char.cash.silver,
    gold: state.char.cash.gold
  };
};

const CashTracker = connect(mapState)(DisconnectCashTracker);
export default CashTracker;
