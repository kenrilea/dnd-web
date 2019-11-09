import React, { Component } from "react";

class SpellSlotIcon extends Component {
  clickHandler = event => {
    this.props.toggleSlot(this.props.burnt, this.props.level);
  };
  render = () => {
    if (this.props.burnt) {
      return (
        <div className="spell-slot filled" onClick={this.clickHandler}></div>
      );
    }
    return <div className="spell-slot" onClick={this.clickHandler}></div>;
  };
}
export default SpellSlotIcon;
