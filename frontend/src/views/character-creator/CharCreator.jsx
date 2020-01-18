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
    this.state = { stage: 0, char: {}, stats: {}, traits: [] };
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
    this.setState({ [name]: event.target.value });
  };
  advance = async event => {
    let newStage = this.state.stage + 1;
    if (newStage === 1) {
      const res = await fetch(
        "/character/template?lvl=1&class=" + this.state.class
      );
      let bod = await res.text();
      bod = JSON.parse(bod);
      let classData = bod.data;
      this.setState({
        stage: newStage,
        baseClass: classData.base[0],
        lvlOne: classData.base[1]
      });
      return;
    } else {
      this.setState({ stage: newStage });
    }
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
        let mod = 0;
        let statValue = statObj[stat];
        if (statValue < 10) {
          mod = (statValue - 10) * -1;
          mod = Math.round(mod / 2);
          mod = mod * -1;
        }
        if (statValue > 11) {
          mod = (statValue - 10) / 2;
          mod = Math.floor(mod);
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
      otherPros: this.state.baseClass.extraProficiencies,
      savingThrowPros: this.state.baseClass.savingThrows,
      combatStats: {},
      weapons: [],
      equipment: [],
      inventory: [],
      cash: { copper: 0, silver: 0, gold: 0 },
      languages: [],
      featuresAndTraits: this.state.traits,
      effects: [],
      spellSlots: this.state.lvlOne.spellSlots,
      preparedSpells: [],
      classSpells: this.state.lvlOne.classSpells
    };

    let combatStats = {
      armorClass: 10 + finalChar.mods.dex,
      initiative: finalChar.mods.dex,
      speed: 30,
      maxHealth:
        this.state.baseClass.baseHP +
        finalChar.mods.con * finalChar.baseInfo.level,
      bonusHealth: 0,
      hitDice: this.state.lvlOne.hitDice,
      deathSaves: [],
      passivePerception: 10 + finalChar.mods.wis
    };
    finalChar.combatStats = combatStats;
    finalChar.combatStats.currentHealth = finalChar.combatStats.maxHealth;
    finalChar.maxPrepared =
      this.state.lvlOne.maxPrepared +
      finalChar.mods[this.state.lvlOne.spellStat];
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
