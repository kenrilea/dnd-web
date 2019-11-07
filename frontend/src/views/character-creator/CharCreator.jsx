import React, { Component } from "react";
import { connect } from "react-redux";

const races = [
  "Elf",
  "Dwarf",
  "Human",
  "Halfling",
  "Gnome",
  "Half-Orc",
  "Half-Elf",
  "Dragonborn"
];
const charClasses = [
  "Bard",
  "Barbarian",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorceror",
  "Warlock",
  "Wizard"
];

class UnconnectedCharCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { stage: 0, char: {} };
  }
  drawRaceDropdown = race => {
    return <option>{race}</option>;
  };
  drawClassDropdown = charClass => {
    return <option>{charClass}</option>;
  };
  dropdownHandler = event => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };
  advance = event => {
    this.setState({ stage: this.state.stage + 1 });
  };
  render = () => {
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Character Name"
            value={this.state.charName}
            className="input-base"
          />
        </div>
        <div className="stat-wrapper">
          <div>
            <div className="subcategory-header">Race:</div>
            <select name="race" onChange={this.dropdownHandler}>
              {races.map(this.drawRaceDropdown)}
            </select>
          </div>
          <div>
            <div className="subcategory-header">Class:</div>
            <select name="class" onChange={this.dropdownHandler}>
              {charClasses.map(this.drawClassDropdown)}
            </select>
          </div>
        </div>
        {this.state.stage > 0 && <div>CHOOSE SUBRACE</div>}
        {this.state.stage > 1 && <div>ROLL and ASSIGN STATS</div>}
        {this.state.stage > 2 && <div>CHOOSE LEVEL</div>}
        {this.state.stage > 3 && <div>MAKE CLASS CHOICES</div>}
        {this.state.stage > 4 && <div>CONFIRM N STUFF</div>}
        <button className="button-base" onClick={this.advance}>
          Next
        </button>
      </div>
    );
  };
}

const mapState = state => {
  return {};
};

const CharCreator = connect(mapState)(UnconnectedCharCreator);
export default CharCreator;
