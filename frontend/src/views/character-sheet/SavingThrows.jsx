import React, { Component } from "react";

class SavingThrows extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  drawSaves = saves => {
    let saveElem = [];
    let statNames = Object.keys(this.props.stats);
    for (let i = 0; i < saves.length; i++) {
      let mod = this.props.stats[statNames[i]];
      if (saves[i]) {
        mod = mod + this.props.pro;
      }
      if (mod >= 1) {
        mod = "+" + mod;
      }
      let elem = (
        <div>
          {statNames[i].toUpperCase()}: {mod}
        </div>
      );
      saveElem.push(elem);
    }
    return saveElem;
  };
  render = () => {
    return (
      <div className="saving-throws">
        saving throws<div>{this.drawSaves(this.props.saves)}</div>
      </div>
    );
  };
}

export default SavingThrows;
