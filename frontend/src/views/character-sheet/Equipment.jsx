import React, { Component } from "react";
import { connect } from "react-redux";
import AddGearForm from "./AddGearForm.jsx";

class DisconnectEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = { adding: false };
  }
  drawGear = gearData => {
    return (
      <div className="gear-elem">
        <div className="gear-name">{gearData.name + ": "}</div>
        <div>{gearData.description}</div>
      </div>
    );
  };
  addGear = () => {
    this.setState({ adding: !this.state.adding });
  };
  render = () => {
    return (
      <div className="equip-wrapper">
        Equipment:
        <div>
          <button onClick={this.addGear} className="button-base">
            Add
          </button>
          {this.state.adding && <AddGearForm submit={this.addGear} />}
        </div>
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
