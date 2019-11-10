import React, { Component } from "react";
import { connect } from "react-redux";
//{ name: "Meat Cleaver", damage: "D4", type: "slashing" }

class UnconnectedWeapons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  drawWeapon = wepData => {
    return (
      <div className="weapon-style">
        <div>
          {wepData.name}: +{wepData.hit} to hit.{" "}
          {wepData.damage + " " + wepData.type + " damage"}
        </div>
        <div>
          {wepData.range > 5 && "Range: " + wepData.range}
          {wepData.range <= 5 && "Melee"}
        </div>
        <div>{wepData.info && wepData.info}</div>
      </div>
    );
  };
  render = () => {
    return (
      <div className="weapon-wrapper">
        {this.props.weapons.map(this.drawWeapon)}
      </div>
    );
  };
}

const mapState = state => {
  return { weapons: state.char.weapons };
};

const Weapons = connect(mapState)(UnconnectedWeapons);
export default Weapons;
