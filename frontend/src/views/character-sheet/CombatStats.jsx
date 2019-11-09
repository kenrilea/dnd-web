import React, { Component } from "react";
import SavingThrows from "./SavingThrows.jsx";
import Hitpoints from "./Hitpoints.jsx";
import Weapons from "./Weapons.jsx";

class CombatStats extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  toggle = event => {
    this.setState({ active: !this.state.active });
  };
  render = () => {
    if (this.state.active) {
      return (
        <div className="borderless-wrapper">
          <button onClick={this.toggle} className="combat-button">
            Hide
          </button>
          COMBAT STATISTICS
          <div className="combat-stat-wrapper">
            <SavingThrows
              pro={2}
              saves={this.props.combatStats.saves}
              stats={this.props.stats}
            />
            <div className="saving-throws">
              <div>
                initiative
                <div className="misc-stats">
                  {this.props.stats.dex + this.props.combatStats.initiative}
                </div>
              </div>
              <div>
                speed
                <div className="misc-stats">{this.props.combatStats.speed}</div>
              </div>
            </div>
            <div className="saving-throws">
              <div>armor</div>
              <div className="misc-stats">
                {this.props.combatStats.armorClass}
              </div>
              <div>class</div>
            </div>
            <Hitpoints
              max={this.props.combatStats.maxHealth}
              current={this.props.combatStats.currentHealth}
              bonus={this.props.combatStats.bonusHealth}
            />
            <Weapons weapons={this.props.weapons} />
          </div>
        </div>
      );
    }
    return (
      <div className="borderless-wrapper">
        <button onClick={this.toggle} className="combat-button">
          Show Combat Stats
        </button>
      </div>
    );
  };
}

export default CombatStats;
