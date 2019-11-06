import React, { Component } from "react";

class Stat extends Component {
  generateMod = stat => {
    let mod = stat - 10;
    mod = mod / 2;
    return Math.floor(mod);
  };
  render = () => {
    return (
      <div className="stat-box-style">
        <img src="/stat.jpg" />
        <span className="stat-style">{this.props.stat}</span>
        <span className="mod-style">{generateMod(this.props.stat)}</span>
      </div>
    );
  };
}
