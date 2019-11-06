import React, { Component } from "react";
//{ name: "Meat Cleaver", damage: "D4", type: "slashing" }

class Weapons extends Component {
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
export default Weapons;
