import React, { Component } from "react";

class SkillComp extends Component {
  getBonus = () => {
    let mod = undefined;
    if (this.props.skill.prof) {
      mod = this.props.stat + this.props.pro;
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
  render = () => {
    console.log(this.props.stat);
    return (
      <div>
        <span>
          {this.props.skill.name}: {this.getBonus()}
        </span>
      </div>
    );
  };
}

export default SkillComp;
