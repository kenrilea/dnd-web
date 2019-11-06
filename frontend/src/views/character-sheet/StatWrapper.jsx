import React, { Component } from "react";
import StatBox from "./StatBox.jsx";

class StatWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        str: this.props.stats.str,
        dex: this.props.stats.dex,
        con: this.props.stats.con,
        int: this.props.stats.int,
        wis: this.props.stats.wis,
        cha: this.props.stats.cha
      }
    };
  }
  drawStatBoxes = stats => {
    let cats = Object.keys(stats);
    return cats.map(stat => {
      return <StatBox label={stat} stat={stats[stat]} />;
    });
  };

  render = () => {
    return (
      <div className="stat-wrapper">{this.drawStatBoxes(this.state.stats)}</div>
    );
  };
}

export default StatWrapper;
