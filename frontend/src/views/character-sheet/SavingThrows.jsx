import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSavingThrows extends Component {
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

const mapState = state => {
  console.log(state.char.stats);
  return {
    saves: state.char.savingThrowPros,
    stats: state.char.mods,
    editing: state.editing,
    pro: 3
  };
};

const SavingThrows = connect(mapState)(UnconnectedSavingThrows);

export default SavingThrows;
