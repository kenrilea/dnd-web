import React, { Component } from "react";
import { connect } from "react-redux";

class DisconnectBasicInfo extends Component {
  getRacialDemo(race) {
    if (race === "elf") {
      return "Elven";
    }
    if (race === "gnome") {
      return "Gnomish";
    }
    if (race === "half-elf") {
      return "Half Elven";
    }
    return race[0].toUpperCase() + race.slice(1, race.length);
  }
  render = () => {
    return (
      <div className="char-header">
        <div className="char-name">
          {this.props.data.name}
          <span className="char-race">{" the " + this.props.data.race}</span>
        </div>
        <div>
          Level
          {" " + this.props.data.level + " " + this.props.data.class}
        </div>
      </div>
    );
  };
}

const mapState = state => {
  return { data: state.char.baseInfo };
};

const BasicInfo = connect(mapState)(DisconnectBasicInfo);

export default BasicInfo;
