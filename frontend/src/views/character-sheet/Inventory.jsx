import React, { Component } from "react";

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
        <div>{this.props.inventory.map(this.drawItems)}</div>
      </div>
    );
  };
}
export default Inventory;
