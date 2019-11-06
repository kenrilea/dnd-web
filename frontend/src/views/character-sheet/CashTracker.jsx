import React, { Component } from "react";
import { connect } from "react-redux";
import StatEditor from "./StatEditor.jsx";
import { isUndefined } from "util";
const R = require("ramda");

class DisconnectCashTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copper: { amount: this.props.copper, adding: undefined },
      silver: { amount: this.props.copper, adding: undefined },
      gold: { amount: this.props.copper, adding: undefined }
    };
  }

  addCash = (amount, bucket) => {
    amount = parseInt(amount);
    let newBucket = R.clone(this.state[bucket]);
    newBucket.amount = newBucket.amount + amount;
    newBucket.adding = undefined;
    this.setState({ [bucket]: newBucket });
  };
  subCash = (amount, bucket) => {
    amount = parseInt(amount);
    let newBucket = R.clone(this.state[bucket]);
    newBucket.adding = undefined;
    if (amount > this.state[bucket].amount) {
      window.alert(`You do not have that much ${bucket}`);
      this.setState({ [bucket]: newBucket });
      return;
    }
    newBucket.amount = newBucket.amount - amount;
    this.setState({ [bucket]: newBucket });
  };

  addInput = event => {
    let bucket = event.target.name;
    let newBucket = R.clone(this.state[bucket]);
    newBucket.adding = true;
    this.setState({ [bucket]: newBucket });
  };
  subInput = event => {
    let bucket = event.target.name;
    let newBucket = R.clone(this.state[bucket]);
    newBucket.adding = false;
    this.setState({ [bucket]: newBucket });
  };

  drawInput = (adding, id) => {
    if (adding) {
      return <StatEditor modifyStat={this.addCash} name={id} />;
    }
    return <StatEditor modifyStat={this.subCash} name={id} />;
  };

  render = () => {
    return (
      <div className="cash-wrapper">
        <div className="cash-style copper-border">
          copper
          {isUndefined(this.state.copper.adding) && (
            <div className="char-race">{this.state.copper.amount}</div>
          )}
          {!isUndefined(this.state.copper.adding) &&
            this.drawInput(this.state.copper.adding, "copper")}
          <div className="stat-wrapper">
            <button
              className="cash-button copper-border"
              name="copper"
              onClick={this.addInput}
            >
              +
            </button>
            <button
              className="cash-button copper-border"
              name="copper"
              onClick={this.subInput}
            >
              -
            </button>
          </div>
        </div>
        <div className="cash-style silver-border">
          silver
          {isUndefined(this.state.silver.adding) && (
            <div className="char-race">{this.state.silver.amount}</div>
          )}
          {!isUndefined(this.state.silver.adding) &&
            this.drawInput(this.state.silver.adding, "silver")}
          <div className="stat-wrapper">
            <button
              className="cash-button silver-border"
              onClick={this.addInput}
              name="silver"
            >
              +
            </button>
            <button
              className="cash-button silver-border"
              onClick={this.subInput}
              name="silver"
            >
              -
            </button>
          </div>
        </div>
        <div className="cash-style gold-border">
          gold
          {isUndefined(this.state.gold.adding) && (
            <div className="char-race">{this.state.gold.amount}</div>
          )}
          {!isUndefined(this.state.gold.adding) &&
            this.drawInput(this.state.gold.adding, "gold")}
          <div className="stat-wrapper">
            <button
              className="cash-button gold-border"
              onClick={this.addInput}
              name="gold"
            >
              +
            </button>
            <button
              className="cash-button gold-border"
              onClick={this.subInput}
              name="gold"
            >
              -
            </button>
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
