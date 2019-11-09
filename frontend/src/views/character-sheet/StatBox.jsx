import React, { Component } from "react";

class StatBox extends Component {
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

  render = () => {
    return (
      <div className="stat-box-style">
        {
          //<img src="/stat.jpg" className="stat-bg" />
        }
        <div className="stat-label">{this.expandLabel(this.props.label)}</div>
        <div className="stat-style">{this.props.stat}</div>
        <div className="mod-style">{this.generateMod(this.props.stat)}</div>
      </div>
    );
  };
}

export default StatBox;
