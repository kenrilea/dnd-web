import React, { Component } from "react";
import { connect } from "react-redux";
import testSpell from "../../../../backend/testFiles/spell.js";
import spellNames from "../../../assets/druidSpells.js";
import testLibrary from "../../../assets/testLibrary.js";

const unknownSpell = {
  spellId: "undefined",
  spell_name: "Hail of Thorns",
  casting_time: "bonus action",
  range: "Self",
  components: [],
  duration: "Until dispelled",
  description: `spell could not be found`
};

class UnconnectedSpellViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      displayFilter: undefined,
      displayTime: undefined,
      activeSpell: this.props.prepared[0].spellId
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
  prepareSpell = () => {
    if (this.props.prepared.length >= this.props.maxPrepared) {
      window.alert("You already have the maximum number of spells prepared");
      return;
    }
    let newPrep = testLibrary[this.state.activeSpell];
    this.props.dispatch({
      type: "prepareSpell",
      newSpell: newPrep
    });
  };
  getSpellData = spellId => {};
  drawSpells = () => {
    let filterSpellsLevel = () => {
      if (this.state.displayFilter === undefined) {
        return Object.keys(testLibrary.searchLib);
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
      if (this.state.displayTime === "other") {
        return !spell.time.includes("action");
      }
      if (spell.time === this.state.displayTime) {
        return true;
      }
      return false;
    };
    let displayedLevels = filterSpellsLevel();
    return displayedLevels.map(level => {
      let displayedSpells = testLibrary.searchLib[level].filter(
        filterSpellsTime
      );
      return (
        <div>
          <div className="subcategory-header">{level}</div>
          {displayedSpells.map(spell => {
            return (
              <div className="spell-list-item">
                <button
                  onClick={this.viewSpellDetail}
                  name={spell.id}
                  className="spell-list-button"
                >
                  {spell.name}
                </button>
              </div>
            );
          })}
        </div>
      );
    });
  };
  drawActiveDetails = () => {
    let spell = undefined;
    if (this.props.prepared[this.state.activeSpell] === undefined) {
      if (testLibrary[this.state.activeSpell] === undefined) {
        spell = unknownSpell;
      } else {
        spell = testLibrary[this.state.activeSpell];
      }
      /*
      let data = new FormData();
      data.append("query", this.state, activeSpell);
      let res = await fetch("/spell", { method: "POST", body: data });
      let bodJSON = await res.text();
      let bod = JSON.parse(bod);
      spell = bod.spell;
      */
    } else {
      spell = this.props.prepared[this.state.activeSpell];
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
        <button
          className="button-base"
          name={spell.spellId}
          onClick={this.prepareSpell}
        >
          Prepare Spell
        </button>
      </div>
    );
  };
  toggleView = event => {
    this.setState({ expanded: !this.state.expanded });
  };
  render = () => {
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
    prepared: state.char.preparedSpells,
    innate: state.char.innateSpells,
    maxPrepared: state.char.maxPrepared,
    maxKnown: state.char.maxKnown
  };
};

const SpellViewer = connect(mapState)(UnconnectedSpellViewer);
export default SpellViewer;
