import React, { Component } from "react";
import { connect } from "react-redux";

class DisconnectEquipment extends Component {
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

const mapState = state => {
  return { equipped: state.char.equipment };
};

const Equipment = connect(mapState)(DisconnectEquipment);

export default Equipment;
