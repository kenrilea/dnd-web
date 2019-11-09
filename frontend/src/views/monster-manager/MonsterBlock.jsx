import React, { Component } from "react";

class MonsterBlock extends Component {
  constructor(props) {
    super(props);
  }

  drawAbility = ability => {
    return (
      <div>
        {ability.name}:{" "}
        {ability.hitBonus > 0 && <span>+{ability.hitBonus} to hit </span>}
        Damage: {ability.dmgDie}{" "}
        {ability.dmgMod > 0 && <span>+{ability.dmgMod}</span>}
      </div>
    );
  };

  render = () => {
    return (
      <div>
        <h4>{this.props.name}</h4>
        <div>
          STR:{this.props.stats.STR}(+{this.props.stats.STR - 10}) DEX:
          {this.props.stats.DEX} CON:
          {this.props.stats.CON} INT:{this.props.stats.INT} WIS:
          {this.props.stats.WIS} CHA:{this.props.stats.CHA}
        </div>
        <div>Abilites:</div>
        {this.props.abilites.map(this.drawAbility)}
      </div>
    );
  };
}

export default MonsterBlock;
