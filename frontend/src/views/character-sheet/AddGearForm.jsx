import React, { Component } from "react";
import { connect } from "react-redux";
const R = require("ramda");

class UnconnectedAddGearForm extends Component {
  constructor(props) {
    super(props);
    this.state = { type: "inventory" };
  }
  onChange = event => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };
  changeType = event => {
    this.setState({ type: event.target.value });
  };
  addStat = event => {};
  submitHandler = event => {
    let createInvObj = () => {
      return {
        name: this.state.name,
        qty: this.state.qty,
        description: this.state.description
      };
    };
    let createEquipObj = () => {
      return {
        name: this.state.name,
        description: this.state.description,
        stats: this.state.stats
      };
    };
    let createWepObj = () => {
      return {
        name: this.state.name,
        damage: this.state.dmgDie,
        type: this.state.dmgType,
        hit: parseInt(this.state.hitBonus),
        range: parseInt(this.state.range),
        special: this.state.description
      };
    };
    event.preventDefault();
    if (this.state.type === "inventory") {
      this.props.dispatch({ type: "addInventory", item: createInvObj() });
    }
    if (this.state.type === "equipment") {
      this.props.dispatch({ type: "addEquipment", item: createEquipObj() });
    }
    if (this.state.type === "weapons") {
      this.props.dispatch({ type: "addWeapon", item: createWepObj() });
    }
    this.props.submit();
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            Item Type:
            <select value={this.state.type} onChange={this.changeType}>
              <option value="inventory">Normal</option>
              <option value="equipment">Equipment</option>
              <option value="weapons">Weapon</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              className="stat-input"
            />
            {this.state.type === "inventory" && (
              <input
                type="text"
                placeholder="Qty"
                name="qty"
                onChange={this.onChange}
                value={this.state.qty}
                className="stat-input"
              />
            )}
          </div>
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={this.onChange}
            value={this.state.description}
            className="stat-input"
          />
          {this.state.type === "weapons" && (
            <div>
              <input
                type="text"
                placeholder="Bonus to Hit"
                name="hitBonus"
                className="stat-input"
                onChange={this.onChange}
                value={this.state.hitBonus}
              />
              <input
                type="text"
                placeholder="Damage Dice"
                name="dmgDie"
                className="stat-input"
                onChange={this.onChange}
                value={this.state.dmgDie}
              />
              <input
                type="text"
                placeholder="Damage Type"
                name="dmgType"
                className="stat-input"
                onChange={this.onChange}
                value={this.state.dmgType}
              />
              <input
                type="text"
                placeholder="Range"
                name="range"
                className="stat-input"
                onChange={this.onChange}
                value={this.state.range}
              />
            </div>
          )}
          {this.state.type === "equipment" && (
            <div>
              Stat Modifiers:
              <input
                type="text"
                placeholder="Stat"
                name="statName"
                onChange={this.onChange}
                value={this.state.statName}
              />
              <input
                type="text"
                placeholder="Bonus"
                name="statBonus"
                onChange={this.onChange}
                value={this.state.statBonus}
              />
              <button
                className="button-base"
                onClick={this.addStat}
                type="button"
              >
                Add Another Bonus
              </button>
            </div>
          )}
          <button className="button-base">Add Item</button>
        </form>
      </div>
    );
  };
}

const AddGearForm = connect()(UnconnectedAddGearForm);
export default AddGearForm;
