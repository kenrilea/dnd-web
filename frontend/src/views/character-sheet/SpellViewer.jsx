import React, { Component } from "react";
import { connect } from "react-redux";
import spell from "../../../../backend/testFiles/spell.js";
/*
spell = {
    "spellId": "TEST_CHAR",
    "spell_name": "Hail of Thorns",
    "casting_time": "1 bonus action",
    "range": "Self",
    "components": ["V"],
    "duration": "Until dispelled",
    description: `the next time you hit a creature with a 
    ranged weapon attack before the spell ends this spell creates 
    a rain of throns that sprouts from your ranged weapon 
    or ammunition in addition to the normal effect of the attack, 
    the target of the attaka dn each creature withtin 5 feet of it 
    mush make a decterit saving throw`
}
*/

class UnconnectedSpellViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { displayFilter: undefined, activeSpell: "spell_id" };
  }
  drawLevelDropdown = () => {
    let options = this.props.levels.map(level => {
      return <option value={level}>{level.toUpperCase()}</option>;
    });
    return options;
  };
  dropdownHandler = event => {
    this.setState({
      displayFilter: event.target.value
    });
  };
  filterSpells = () => {
    return <div>Spell Name</div>;
  };
  drawActiveDetails = spellId => {
    return (
      <div className="spell-detail">
        <div className="spell-header">
          <div className="subcategory-header">{spell.spell_name}</div>
          <div>Range{": " + spell.range + " "}</div>
          <div>
            Casting Time{": " + spell.casting_time + " "}Components
            {": " + spell.components}{" "}
          </div>
          <div>
            Save Stat
            {": " + spell.save + " "}
            Duration{": " + spell.duration}
          </div>
        </div>
        <div>{spell.description}</div>
      </div>
    );
  };
  render = () => {
    return (
      <div className="horozontial-category">
        <div className="spell-sidebar">
          <div>
            Filter By Level:
            <select
              value={this.state.displayLevel}
              onChange={this.dropdownHandler}
            >
              <option value={undefined}>ALL</option>
              <option value="haveLevel">AVALIABLE</option>
              {this.drawLevelDropdown()}
            </select>
          </div>
          <div>{this.filterSpells()}</div>
        </div>
        {this.drawActiveDetails(this.state.activeSpell)}
      </div>
    );
  };
}

const mapState = state => {
  return {
    levels: Object.keys(state.char.spellSlots)
  };
};

const SpellViewer = connect(mapState)(UnconnectedSpellViewer);
export default SpellViewer;
