import React, { Component } from "react";

class AbilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilites: [],
      name: "",
      hitBonus: 0,
      dmgDie: "",
      dmgMod: 0
    };
  }

  submitAbility = async event => {
    event.preventDefault();
    let newAbility = {
      name: this.state.name,
      hitBonus: this.state.hitBonus,
      dmgDie: this.state.dmgDie,
      dmgMod: this.state.dmgMod
    };
    console.log("addedAbility");
    let data = new FormData();
    data.append("monster", this.props.monsterName);
    data.append("name", this.state.name);
    data.append("hitBonus", this.state.hitBonus);
    data.append("dmgDie", this.state.dmgDie);
    data.append("dmgMod", this.state.dmgMod);
    await fetch("/add-ability", { method: "POST", body: data });
    this.setState({
      abilites: this.state.abilites.concat(newAbility),
      name: "",
      hitBonus: 0,
      dmgDie: "",
      dmgMod: 0
    });
  };

  drawAbility = ability => {
    console.log(ability);
    return (
      <div>
        {ability.name}:{" "}
        {ability.hitBonus > 0 && <span>+{ability.hitBonus} to hit </span>}
        Damage: {ability.dmgDie}{" "}
        {ability.dmgMod > 0 && <span>+{ability.dmgMod}</span>}
      </div>
    );
  };

  nameChangeHandler = event => {
    this.setState({ name: event.target.value, hitBonus: this.state.hitBonus });
  };

  hitChange = event => {
    this.setState({ hitBonus: parseInt(event.target.value) });
  };

  dmgChange = event => {
    this.setState({ dmgDie: event.target.value });
  };

  dmgModChange = event => {
    this.setState({ dmgMod: parseInt(event.target.value) });
  };

  render = () => {
    return (
      <div>
        <div>{this.state.abilites.map(this.drawAbility)}</div>
        <form onSubmit={this.submitAbility}>
          <input
            type="text"
            placeholder="Ability Name"
            onChange={this.nameChangeHandler}
            value={this.state.name}
          />
          <div>
            <input
              type="text"
              placeholder="Hit Bonus"
              onChange={this.hitChange}
              value={this.state.hitBonus}
            />
            <input
              type="text"
              placeholder="Damage: XdY"
              onChange={this.dmgChange}
              value={this.state.dmgDie}
            />
            <input
              type="text"
              placeholder="Damage: +X"
              onChange={this.dmgModChange}
              value={this.state.dmgMod}
            />
          </div>
          <input type="submit" value="Add Ability" />
        </form>
      </div>
    );
  };
}

export default AbilityForm;
