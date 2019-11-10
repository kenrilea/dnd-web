import React, { Component } from "react";
import { connect } from "react-redux";
import CashTracker from "./CashTracker.jsx";
import AddGearForm from "./AddGearForm.jsx";

class UnconnectedInventory extends Component {
  constructor(props) {
    super(props);
    this.state = { adding: false };
  }
  addGear = () => {
    this.setState({ adding: !this.state.adding });
  };
  drawItems = itemData => {
    return (
      <div className="gear-elem">
        <div>
          <div className="gear-name">{itemData.name + ": "}</div>
          <div>{itemData.qty && <div>Quantity: {itemData.qty}</div>}</div>
        </div>
        <div>{itemData.description}</div>
      </div>
    );
  };
  render = () => {
    return (
      <div className="equip-wrapper">
        Inventory:
        <CashTracker />
        <div>
          <button onClick={this.addGear} className="button-base">
            Add
          </button>
          {this.state.adding && <AddGearForm submit={this.addGear} />}
        </div>
        <div>{this.props.inventory.map(this.drawItems)}</div>
      </div>
    );
  };
}
const mapState = state => {
  return { inventory: state.char.inventory };
};
const Inventory = connect(mapState)(UnconnectedInventory);
export default Inventory;
