import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSkillComp extends Component {
  constructor(props) {
    super(props);
    this.state = { skill: { ...this.props.skill, prof: this.props.pro } };
  }
  getBonus = () => {
    let mod = undefined;
    if (this.state.skill.prof) {
      mod = this.props.mods[this.state.skill.stat] + this.props.bonus;
    } else {
      mod = this.props.stat;
    }
    if (mod >= 1) {
      return "+" + mod;
    }
    if (mod < 0) {
      return "" + mod;
    }
    return "0";
  };
  tickHandler = event => {
    if (event.target.checked) {
      this.props.dispatch({
        type: "addSkill",
        skillName: this.props.skill.name
      });
      return;
    }
    this.props.dispatch({
      type: "removeSkill",
      skillName: this.props.skill.name
    });
  };
  render = () => {
    console.log(this.props.skill.name);
    console.log(this.props.pro);
    if (this.props.edit) {
      return (
        <div>
          <span>
            {this.props.skill.name}: {this.getBonus()} Proficent:
          </span>
          <input
            type="checkbox"
            name="pro"
            value={this.state.skill.prof}
            onChange={this.tickHandler}
          />
        </div>
      );
    }
    return (
      <div>
        <span>
          {this.props.skill.name}: {this.getBonus()}
        </span>
      </div>
    );
  };
}

const mapState = state => {
  return { bonus: 3, mods: state.char.mods };
};

const SkillComp = connect(mapState)(UnconnectedSkillComp);

export default SkillComp;
