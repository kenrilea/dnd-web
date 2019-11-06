import React, { Component } from "react";
import CashTracker from "./CashTracker.jsx";

class Inventory extends Component {
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
        <div>{this.props.inventory.map(this.drawItems)}</div>
      </div>
    );
  };
}
export default Inventory;
