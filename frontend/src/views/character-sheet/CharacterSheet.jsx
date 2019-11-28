import React, { Component } from "react";
import { connect } from "react-redux";
import StatWrapper from "./StatWrapper.jsx";
import SkillWrapper from "./SkillWrapper.jsx";
import CombatStats from "./CombatStats.jsx";
import Equipment from "./Equipment.jsx";
import Inventory from "./Inventory.jsx";
import BasicInfo from "./BasicInfo.jsx";
import Spells from "./Spells.jsx";
import Effects from "./Effects.jsx";
import proxy from "../../proxy.js";

class UnconnectedCharacterSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [
        { name: "Animal Handling", stat: "wis", prof: false },
        { name: "Arcana", stat: "int", prof: false },
        { name: "Athletics", stat: "str", prof: false },
        { name: "Deception", stat: "cha", prof: false },
        { name: "History", stat: "int", prof: false },
        { name: "Insight", stat: "wis", prof: false },
        { name: "Intimidation", stat: "cha", prof: false },
        { name: "Investigation", stat: "int", prof: false },
        { name: "Medicine", stat: "wis", prof: false },
        { name: "Nature", stat: "int", prof: false },
        { name: "Perception", stat: "wis", prof: false },
        { name: "Performance", stat: "cha", prof: false },
        { name: "Persuasion", stat: "cha", prof: false },
        { name: "Religion", stat: "int", prof: false },
        { name: "Sleight of Hand", stat: "dex", prof: false },
        { name: "Stealth", stat: "dex", prof: false },
        { name: "Survival", stat: "wis", prof: false }
      ]
    };
  }
  generateMods = statsObj => {
    let statToMod = stat => {
      let mod = stat - 10;
      mod = mod / 2;
      if (mod > 0) {
        mod = Math.floor(mod);
        return mod;
      }
      if (mod < 0) {
        mod = Math.round(mod);
        return mod;
      }
      return mod;
    };
    let names = Object.keys(statsObj);
    let statMods = {};
    names.forEach(statName => {
      statMods[statName] = statToMod(statsObj[statName]);
    });
    return statMods;
  };

  saveChar = async () => {
    let data = new FormData();
    console.log("adding char id to form " + this.props.char.baseInfo.id);
    data.append("id", this.props.char.baseInfo.id);
    let charData = JSON.stringify(this.props.char);
    data.append("charData", charData);
    const res = await fetch(proxy + "/character/update", {
      method: "POST",
      body: data
    });
    let body = await res.text();
    body = JSON.parse(body);
    if (body.success === true) {
      return;
    }
    alert("body.msg");
  };
  toggleEdit = event => {
    this.props.dispatch({ type: "toggleEdit" });
  };

  render = () => {
    if (this.props.char === undefined) {
      return <div>Loading....</div>;
    }
    this.saveChar();
    return (
      <div className="page-view">
        <BasicInfo />
        <button onClick={this.toggleEdit} className="button-base">
          Edit Character
        </button>
        <div className="horozontial-category">
          <div>
            <StatWrapper />
            <CombatStats
              stats={this.props.char.mods}
              combatStats={this.props.char.combatStats}
              weapons={this.props.char.weapons}
            />
            <div className="stat-wrapper">
              <SkillWrapper
                skills={this.state.skills}
                stats={this.props.char.stats}
                pro={2}
              />
              <div className="flex-vertical">
                <Equipment />
                <Inventory />
              </div>
              <Effects />
            </div>
          </div>
          <div>
            <Spells />
          </div>
        </div>
      </div>
    );
  };
}

const mapState = state => {
  return { char: state.char, editing: state.editing };
};

const CharacterSheet = connect(mapState)(UnconnectedCharacterSheet);

export default CharacterSheet;
