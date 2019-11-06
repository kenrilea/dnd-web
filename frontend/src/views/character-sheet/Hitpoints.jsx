import React, { Component } from "react";
import { isUndefined } from "util";
import StatEditor from "./StatEditor.jsx";
import DeathSaves from "./DeathSaves.jsx";

class Hitpoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max: this.props.max,
      current: this.props.current,
      bonus: this.props.bonus,
      isDamage: undefined,
      currentInput: undefined,
      modifyBonus: undefined,
      dying: false
    };
  }
  damage = event => {
    this.setState({ isDamage: true });
  };
  heal = event => {
    this.setState({ isDamage: false });
  };

  applyDmg = amount => {
    amount = parseInt(amount);
    console.log("damage" + amount);
    if (this.state.bonus > 0) {
      if (this.state.bonus > amount) {
        this.setState({
          bonus: this.state.bonus - amount,
          isDamage: undefined
        });
        return;
      }
      amount = amount - this.state.bonus;
      this.setState({ bonus: 0 });
    }
    let newHp = this.state.current - amount;
    if (newHp <= 0) {
      newHp = 0;
    }
    this.setState({ current: newHp, isDamage: undefined });
  };
  applyHeal = amount => {
    amount = parseInt(amount);
    console.log("heal" + amount);
    let newHp = this.state.current + amount;
    if (newHp > this.state.max) {
      newHp = this.state.max;
    }
    this.setState({ current: newHp, isDamage: undefined });
  };
  dmgOrheal = flag => {
    if (flag) {
      return this.applyDmg;
    }
    return this.applyHeal;
  };

  addBonus = amount => {
    amount = parseInt(amount);
    console.log("add bonus hp " + amount);
    let newBonus = this.state.bonus + amount;
    this.setState({ bonus: newBonus, modifyBonus: undefined });
  };
  subBonus = amount => {
    console.log("remove bonus hp " + amount);
    let newBonus = this.state.bonus - amount;
    if (newBonus <= 0) {
      newBonus = 0;
    }
    this.setState({ bonus: newBonus, modifyBonus: undefined });
  };
  bonusAddSub = swap => {
    if (swap) {
      return this.subBonus;
    }
    return this.addBonus;
  };
  setBonusSub = () => {
    this.setState({ modifyBonus: true });
  };
  setBonusAdd = () => {
    this.setState({ modifyBonus: false });
  };
  stabilize = () => {
    this.setState({ current: 1 });
  };

  render = () => {
    console.log(this.state.bonus);
    return (
      <div className="stat-wrapper">
        <div className="hitpoint-wrapper">
          hitpoints
          <div className="hp-current">
            Current: {this.state.current}
            <div>
              {!isUndefined(this.state.isDamage) && (
                <StatEditor modifyStat={this.dmgOrheal(this.state.isDamage)} />
              )}
              <button className="button-base" onClick={this.damage}>
                DMG
              </button>
              <button className="button-base" onClick={this.heal}>
                HEAL
              </button>
            </div>
          </div>
          <div className="hp-bonus">
            Bonus: {this.state.bonus}
            <div>
              {!isUndefined(this.state.modifyBonus) && (
                <StatEditor
                  modifyStat={this.bonusAddSub(this.state.modifyBonus)}
                />
              )}
              <button className="button-base" onClick={this.setBonusAdd}>
                ADD
              </button>
              <button className="button-base" onClick={this.setBonusSub}>
                SUB
              </button>
            </div>
          </div>
        </div>
        {this.state.current <= 0 && <DeathSaves stabilize={this.stabilize} />}
      </div>
    );
  };
}

export default Hitpoints;
