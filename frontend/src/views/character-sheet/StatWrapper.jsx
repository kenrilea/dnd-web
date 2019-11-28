import React, { Component } from "react";
import StatBox from "./StatBox.jsx";
import SavingThrows from "./SavingThrows.jsx";
import { connect } from "react-redux";

class UnconnectedStatWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: { ...this.props.stats }
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
      <div className="stat-wrapper">
        {this.drawStatBoxes(this.state.stats)}
        <SavingThrows />
      </div>
    );
  };
}

const mapState = state => {
  return { stats: state.char.stats, mods: state.char.mods };
};

const StatWrapper = connect(mapState)(UnconnectedStatWrapper);
export default StatWrapper;
