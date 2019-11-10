import React, { Component } from "react";
import AbilityForm from "./AbilityForm.jsx";

class MonsterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      name: "",
      submit: false
    };
  }

  nameChangeHandler = event => {};

  changeSTR = event => {
    this.setState({ stats: { STR: parseInt(event.target.value) } });
  };

  changeDEX = event => {
    this.setState({ stats: { DEX: parseInt(event.target.value) } });
  };

  changeCON = event => {
    this.setState({ CON: parseInt(event.target.value) });
  };

  changeINT = event => {
    this.setState({ INT: parseInt(event.target.value) });
  };

  changeWIS = event => {
    this.setState({ WIS: parseInt(event.target.value) });
  };

  changeCHA = event => {
    this.setState({ CHA: parseInt(event.target.value) });
  };

  submitHandler = async event => {
    event.preventDefault();
    console.log(this.state);
    let data = new FormData();
    data.append("stats", this.state.stats);
    data.append("name", this.state.name);
    let res = await fetch("add-monster", { method: "POST", body: data });
    this.setState({ submit: res.success });
  };

  render = () => {
    return (
      <div>
        {this.state.submit && <div>Monster Successfully Added</div>}
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              type="text"
              placeholder="Monster Name"
              onChange={this.nameChangeHandler}
            />
          </div>
          <div className="stats-block">
            <div>
              <input
                type="text"
                placeholder="STR"
                onChange={this.changeSTR}
                value={this.state.stats.STR}
              />
              <input
                type="text"
                placeholder="DEX"
                onChange={this.changeDEX}
                value={this.state.stats.DEX}
              />
              <input
                type="text"
                placeholder="CON"
                onChange={this.changeCON}
                value={this.state.stats.CON}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="INT"
                onChange={this.changeINT}
                value={this.state.stats.INT}
              />
              <input
                type="text"
                placeholder="WIS"
                onChange={this.changeWIS}
                value={this.state.stats.WIS}
              />
              <input
                type="text"
                placeholder="CHA"
                onChange={this.changeCHA}
                value={this.state.stats.CHA}
              />
            </div>
          </div>
          <input type="submit" />
        </form>
        <AbilityForm
          submitHandler={this.submitAbility}
          monsterName={this.state.name}
        />
      </div>
    );
  };
}

export default MonsterForm;
