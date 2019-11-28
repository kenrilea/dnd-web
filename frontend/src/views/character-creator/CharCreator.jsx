import React, { Component } from "react";
import { connect } from "react-redux";
import proxy from "../../proxy.js";

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
    this.state = { stage: 0, char: {}, stats: {} };
  }
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  drawRaceDropdown = race => {
    return <option>{race}</option>;
  };
  drawClassDropdown = charClass => {
    return <option>{charClass}</option>;
  };
  dropdownHandler = event => {
    let name = event.target.name;
    console.log(name + ":" + event.target.value);
    this.setState({ [name]: event.target.value });
  };
  advance = event => {
    this.setState({ stage: this.state.stage + 1 });
  };
  statChange = event => {
    let newStats = { ...this.state.stats };
    newStats[event.target.name] = parseInt(event.target.value);
    this.setState({ ...this.state, stats: newStats });
  };
  submitChar = event => {
    let generateId = length => {
      let base = "abcdefghijklmnopqrstuvwxyz";
      let id = "";
      for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * 26);
        id = id + base[index];
      }
      return id;
    };
    let generateMods = statObj => {
      let mods = {};
      let names = Object.keys(statObj);
      names.forEach(stat => {
        let mod = statObj[stat] - 10;
        mod = mod / 2;
        if (mod > 0) {
          mod = Math.floor(mod);
        }
        if (mod < 0) {
          let round = mod * -1;
          round = Math.round(round);
          mod = round * -1;
        } else {
          mod = 0;
        }
        mods[stat] = mod;
      });
      return mods;
    };
    let data = new FormData();
    const charId = generateId(6);
    data.append("id", charId);
    let finalChar = {
      baseInfo: {
        id: charId,
        name: this.state.charName,
        class: this.state.class,
        race: this.state.race,
        alignment: {
          reliability: this.state.reliability,
          morality: this.state.morality
        },
        level: 1,
        experiencePoints: 0
      },
      stats: this.state.stats,
      mods: generateMods(this.state.stats),
      skillPros: [],
      otherPros: [],
      savingThrowPros: [false, false, false, false, false, false],
      combatStats: {},
      weapons: [],
      equipment: [],
      inventory: [],
      cash: { copper: 0, silver: 0, gold: 0 },
      languages: [],
      featuresAndTraits: [],
      effects: [],
      spellSlots: {},
      preparedSpells: []
    };

    let combatStats = {
      armorClass: 10 + finalChar.mods.dex,
      initiative: finalChar.mods.dex,
      speed: 25,
      maxHealth:
        this.state.baseHp + finalChar.mods.con * finalChar.baseInfo.level,
      bonusHealth: 0,
      hitDice: "D4",
      deathSaves: [],
      passivePerception: 10 + finalChar.mods.wis
    };
    finalChar.combatStats = combatStats;
    finalChar.combatStats.currentHealth = finalChar.combatStats.maxHealth;
    let charJSON = JSON.stringify(finalChar);
    data.append("charData", charJSON);
    console.log(data);
    fetch(proxy + "/character/stats", {
      method: "POST",
      body: data,
      credentials: "include"
    });
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
            name="charName"
            onChange={this.inputHandler}
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
        {this.state.stage > 0 && (
          <div>
            <div className="subcategory-header">Input Stats</div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="STR"
                  name="str"
                  onChange={this.statChange}
                  value={this.state.stats.str}
                  className="input-base"
                />

                <input
                  type="text"
                  placeholder="DEX"
                  name="dex"
                  onChange={this.statChange}
                  value={this.state.stats.dex}
                  className="input-base"
                />

                <input
                  type="text"
                  placeholder="CON"
                  name="con"
                  onChange={this.statChange}
                  value={this.state.stats.con}
                  className="input-base"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="INT"
                  name="int"
                  onChange={this.statChange}
                  value={this.state.stats.int}
                  className="input-base"
                />

                <input
                  type="text"
                  placeholder="WIS"
                  name="wis"
                  onChange={this.statChange}
                  value={this.state.stats.wis}
                  className="input-base"
                />

                <input
                  type="text"
                  placeholder="CHA"
                  name="cha"
                  onChange={this.statChange}
                  value={this.state.stats.cha}
                  className="input-base"
                />
              </div>
            </div>
          </div>
        )}
        {this.state.stage > 1 && (
          <div>
            <button className="button-base" onClick={this.submitChar}>
              LETS GO
            </button>
          </div>
        )}
        {/*
        {this.state.stage > 2 && <div>CHOOSE LEVEL</div>}
        {this.state.stage > 3 && <div>MAKE CLASS CHOICES</div>}
        {this.state.stage > 4 && <div>CONFIRM N STUFF</div>}*/}
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
