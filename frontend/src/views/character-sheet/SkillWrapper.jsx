import React, { Component } from "react";
import SkillComp from "./SkillComp.jsx";

class SkillWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { search: undefined };
  }

  searchHandler = event => {
    this.setState({ search: event.target.value });
  };

  skillSearch = () => {
    if (this.state.search === undefined) {
      return this.props.skills;
    }
    let foundSkills = this.props.skills.filter(skill => {
      if (skill.name.toLowerCase().includes(this.state.search)) {
        return true;
      }
      return false;
    });
    return foundSkills;
  };
  getStat = statName => {
    let generateMod = stat => {
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
    let mod = generateMod(this.props.stats[statName]);
    return mod;
  };
  render = () => {
    console.log(this.props.stats);
    return (
      <div className="skill-wrapper">
        <div>
          <input
            type="text"
            placeholder="search skills"
            value={this.state.search}
            onChange={this.searchHandler}
            className="stat-input"
          />
        </div>
        <div>
          {this.skillSearch().map(skill => {
            return (
              <SkillComp
                skill={skill}
                stat={this.getStat(skill.stat)}
                pro={this.props.pro}
              />
            );
          })}
        </div>
      </div>
    );
  };
}

export default SkillWrapper;
