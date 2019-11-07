import React, { Component } from "react";
import { connect } from "react-redux";
import SpellSlots from "./SpellSlots.jsx";
import SpellViewer from "./SpellViewer.jsx";

class UnconnectedSpells extends Component {
  render = () => {
    return (
      <div className="wrapper">
        <div className="category-header">SPELLS</div>
        <SpellSlots />
        <SpellViewer />
      </div>
    );
  };
}

const mapState = state => {
  return { spells: state.char.spells, slots: state.char.spellSlots };
};

const Spells = connect(mapState)(UnconnectedSpells);
export default Spells;
