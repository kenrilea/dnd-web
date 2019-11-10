import React, { Component } from "react";
import { connect } from "react-redux";
import SpellSlots from "./SpellSlots.jsx";
import SpellViewer from "./SpellViewer.jsx";
import SpellQuickView from "./SpellQuickView.jsx";
import testSpell from "./../../../../backend/testFiles/spell.js";

class UnconnectedSpells extends Component {
  drawQuickSpells = spell => {
    return <SpellQuickView spell={spell} />;
  };
  render = () => {
    return (
      <div className="wrapper">
        <div className="category-header">SPELLS</div>
        <SpellSlots />
        {this.props.preparedSpells.map(this.drawQuickSpells)}
        <SpellViewer />
      </div>
    );
  };
}

const mapState = state => {
  return {
    preparedSpells: state.char.preparedSpells,
    slots: state.char.spellSlots
  };
};

const Spells = connect(mapState)(UnconnectedSpells);
export default Spells;
