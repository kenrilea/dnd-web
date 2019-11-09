import React, { Component } from "react";
import { connect } from "react-redux";
import SpellSlotIcon from "./SpellSlotIcon.jsx";

class UnconnectedSpellSlots extends Component {
  toggleSlot = (burntSwitch, level) => {
    if (burntSwitch) {
      this.props.dispatch({ type: "restoreSlot", level: level });
      return;
    }
    this.props.dispatch({ type: "useSlot", level: level });
  };

  drawSlots = slotLevel => {
    let slotIcons = [];
    let max = this.props.slots[slotLevel].max;
    let filled = this.props.slots[slotLevel].filled;
    for (let i = 0; i < filled; i++) {
      slotIcons.push(
        <SpellSlotIcon
          burnt={true}
          toggleSlot={this.toggleSlot}
          level={slotLevel}
        />
      );
    }
    for (let i = 0; i < max - filled; i++) {
      slotIcons.push(
        <SpellSlotIcon
          burnt={false}
          toggleSlot={this.toggleSlot}
          level={slotLevel}
        />
      );
    }
    return (
      <div>
        <div className="subcategory-header">
          <div>
            {slotLevel[0].toUpperCase() + slotLevel.slice(1, slotLevel.length)}
          </div>
          <div>Level</div>
        </div>
        <div className="flex-vertical">{slotIcons}</div>
      </div>
    );
  };
  drawSpellLevels = () => {
    let slotLevels = Object.keys(this.props.slots);
    return slotLevels.map(this.drawSlots);
  };
  render = () => {
    return <div className="horozontial-category">{this.drawSpellLevels()}</div>;
  };
}

const mapState = state => {
  //console.log(state.char.spellSlots);
  return { slots: state.char.spellSlots };
};

const SpellSlots = connect(mapState)(UnconnectedSpellSlots);
export default SpellSlots;
