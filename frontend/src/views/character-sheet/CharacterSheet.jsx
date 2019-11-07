import React, { Component } from "react";
import characterData from "../../../assets/characterData.js";
import StatWrapper from "./StatWrapper.jsx";
import SkillWrapper from "./SkillWrapper.jsx";
import CombatStats from "./CombatStats.jsx";
import Equipment from "./Equipment.jsx";
import Inventory from "./Inventory.jsx";
import BasicInfo from "./BasicInfo.jsx";
<<<<<<< HEAD
import Spells from "./Spells.jsx";
=======
>>>>>>> 8a1da0533b03a9d9526074504d8aa3adaf3eb06f

class CharacterSheet extends Component {
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
  loadChar = async () => {
    let charData = characterData;
    console.log(charData);
    let mods = this.generateMods(charData.stats);
    this.setState({ char: charData, stats: charData.stats, mods: mods });
  };
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

  componentDidMount = () => {
    console.log("getting character stats");
    this.loadChar();
  };

  render = () => {
    if (this.state.char) {
      return (
        <div>
          <BasicInfo />
          <StatWrapper stats={this.state.char.stats} />
          <CombatStats
            stats={this.state.mods}
            combatStats={this.state.char.combatStats}
            weapons={this.state.char.weapons}
          />
          <div className="stat-wrapper">
            <SkillWrapper
              skills={this.state.skills}
              stats={this.state.stats}
              pro={2}
            />
<<<<<<< HEAD
            <div className="flex-vertical">
              <Equipment />
              <Inventory />
            </div>
            <div>
              <Spells />
            </div>
=======
            <Equipment />
            <Inventory inventory={this.state.char.inventory} />
>>>>>>> 8a1da0533b03a9d9526074504d8aa3adaf3eb06f
          </div>
        </div>
      );
    }
    return <div>Loading....</div>;
  };
}

const mapState = state => {};

export default CharacterSheet;
