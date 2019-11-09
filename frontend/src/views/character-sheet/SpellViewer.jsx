import React, { Component } from "react";
import { connect } from "react-redux";
import spell from "../../../../backend/testFiles/spell.js";
import spellNames from "../../../assets/druidSpells.js";
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
    this.state = {
      expanded: false,
      displayFilter: undefined,
      activeSpell: "spell_id"
    };
  }
  drawLevelDropdown = () => {
    let options = this.props.levels.map(level => {
      return <option value={level}>{level.toUpperCase()}</option>;
    });
    return options;
  };
  filterByLevel = event => {
    this.setState({
      displayFilter: event.target.value
    });
  };
  filterByTime = event => {
    this.setState({ displayTime: event.target.value });
  };
  viewSpellDetail = event => {
    this.setState({ activeSpell: event.target.name });
  };
  drawSpells = () => {
    let filterSpellsLevel = () => {
      if (this.state.displayFilter === undefined) {
        return Object.keys(spellNames);
      }
      if (this.state.displayFilter === "haveLevel") {
        return this.props.levels;
      }
      return [this.state.displayFilter];
    };
    let filterSpellsTime = spell => {
      if (this.state.displayTime === undefined) {
        return true;
      }
      //if (this.state.displayTime === "other") {
      //return !spell.casting_time.includes("action");
      //}
      if (spell.casting_time === this.state.displayTime) {
        return true;
      }
      return false;
    };
    let displayedLevels = filterSpellsLevel();
    return displayedLevels.map(level => {
      let displayedSpells = spellNames[level];
      displayedSpells = displayedSpells.filter(spell => {
        return true;
      });
      return (
        <div>
          <div className="subcategory-header">{level}</div>
          {displayedSpells.map(spell => {
            return (
              <div className="spell-list-item">
                <button
                  onClick={this.viewSpellDetail}
                  name={spell}
                  className="spell-list-button"
                >
                  {spell}
                </button>
              </div>
            );
          })}
        </div>
      );
    });
  };
  drawActiveDetails = async () => {
    if (this.props.prepared[this.state.activeSpell] === undefined) {
      let data = new FormData();
      data.append("query", this.state, activeSpell);
      let res = await fetch("/spell", { method: "POST", body: data });
      let bodJSON = await res.text();
      let bod = JSON.parse(bod);
      let spell = bod.spell;
    } else {
      let spell = this.props.prepared[this.state.activeSpell];
    }
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
  toggleView = event => {
    this.setState({ expanded: !this.state.expanded });
  };
  render = () => {
    console.log(this.state.activeSpell);
    if (this.state.expanded) {
      return (
        <div>
          <button className="button-base" onClick={this.toggleView}>
            Close Spell Viewer
          </button>
          <div className="horozontial-category">
            <div className="spell-sidebar">
              <div>
                Filters:
                <div>
                  Level:
                  <select
                    value={this.state.displayLevel}
                    onChange={this.filterByLevel}
                  >
                    <option value={undefined}>All</option>
                    <option value="haveLevel">Avaliable</option>
                    <option value="cantrip">Cantrips</option>
                    {this.drawLevelDropdown()}
                  </select>
                </div>
                <div>
                  Cast Time:
                  <select
                    value={this.state.displayTime}
                    onChange={this.filterByTime}
                  >
                    <option value={undefined}>All</option>
                    <option value="action">Action</option>
                    <option value="bonus action">Bonus Action</option>
                    <option value="reaction">Reaction</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>{this.drawSpells()}</div>
            </div>
            {this.drawActiveDetails(this.state.activeSpell)}
          </div>
        </div>
      );
    }
    return (
      <button className="button-base" onClick={this.toggleView}>
        Open Spell Viewer
      </button>
    );
  };
}

const mapState = state => {
  return {
    levels: Object.keys(state.char.spellSlots),
    prepared: state.char.preparedSpells
  };
};

const SpellViewer = connect(mapState)(UnconnectedSpellViewer);
export default SpellViewer;
