import React, { Component } from "react";

class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  drawGear = gearData => {
    return (
      <div className="gear-elem">
        <div className="gear-name">{gearData.name + ": "}</div>
        <div>{gearData.description}</div>
      </div>
    );
  };
  render = () => {
    return (
      <div className="equip-wrapper">
        Equipment:
        <div>{this.props.equipped.map(this.drawGear)}</div>
      </div>
    );
  };
}

export default Equipment;
