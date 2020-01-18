import React, { Component } from "react";
import { connect } from "react-redux";
import StatEditor from "./StatEditor.jsx";

class UnconnectedStatBox extends Component {
  generateMod = stat => {
    let mod = stat - 10;
    mod = mod / 2;
    if (mod > 0) {
      mod = Math.floor(mod);
      return "+" + mod;
    }
    if (mod < 0) {
      mod = Math.round(mod);
      return "" + mod;
    }
    return mod;
  };
  expandLabel = label => {
    if (label === "str") {
      return "strength";
    }
    if (label === "dex") {
      return "dexterity";
    }
    if (label === "con") {
      return "constitution";
    }
    if (label === "int") {
      return "intelligence";
    }
    if (label === "wis") {
      return "wisdom";
    }
    if (label === "cha") {
      return "charisma";
    }
    return label;
  };
  editStat = (value, source) => {
    const generateMod = stat => {
      let mod = undefined;
      if (stat < 10) {
        mod = (stat - 10) * -1;
        mod = Math.round(mod);
        return mod * -1;
      }
      mod = stat - 10;
      return Math.floor(mod);
    };
    this.props.dispatch({
      type: "editStat",
      stat: this.props.label,
      newValue: value,
      newMod: generateMod(value)
    });
  };
  render = () => {
    return (
      <div className="stat-box-style">
        {
          //<img src="/stat.jpg" className="stat-bg" />
        }
        <div className="stat-label">{this.expandLabel(this.props.label)}</div>
        <div className="stat-style">{this.props.stat}</div>
        {this.props.editing && (
          <StatEditor modifyStat={this.editStat} name={this.props.label} />
        )}
        <div className="mod-style">{this.generateMod(this.props.stat)}</div>
      </div>
    );
  };
}

const mapState = state => {
  return { editing: state.editing };
};

const StatBox = connect(mapState)(UnconnectedStatBox);

export default StatBox;
