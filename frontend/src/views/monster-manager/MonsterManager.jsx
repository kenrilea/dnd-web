import React, { Component } from "react";
import MonsterForm from "./MonsterForm.jsx";
import MonsterBlock from "./MonsterBlock.jsx";

class MonsterManager extends Component {
  constructor(props) {
    super(props);
    this.state = { addMonster: false, showMonster: false, monsters: {} };
  }

  toggleMonsterForm = () => {
    this.setState({ addMonster: !this.state.addMonster });
  };

  toggleMonsterDisplay = async () => {
    let newMonsters = await this.loadMonsters();
    console.log(newMonsters);
    this.setState({
      showMonster: !this.state.showMonster,
      monsters: newMonsters
    });
  };

  drawMonsters = () => {
    let names = Object.keys(this.state.monsters);
    let monsterMap = monster => {
      return (
        <MonsterBlock
          name={monster}
          stats={this.state.monsters[monster].stats}
          abilites={this.state.monsters[monster].abilites}
        />
      );
    };
    return <div>{names.map(monsterMap)}</div>;
  };

  loadMonsters = async () => {
    let res = await fetch(proxy + "/monsters");
    let monsterJSON = await res.text();
    let monsters = JSON.parse(monsterJSON);
    console.log(monsters);
    //monsters is an object. the props are the monster names and the values are objects w/ stats, ect
    //{name:{ stats:{all the stats n stuff}, abilites:[{abilityObj},{abilityObj}]}}
    return monsters;
  };

  render = () => {
    console.log(this.state.addMonster);
    return (
      <div>
        <button onClick={this.toggleMonsterForm}>
          {!this.state.addMonster && <span>Add A Monster</span>}
          {this.state.addMonster && <span>Collapse Monster Builder</span>}
        </button>
        <button onClick={this.toggleMonsterDisplay}>
          {!this.state.showMonster && <span>Show Monsters</span>}
          {this.state.showMonster && <span>Collapse Monsters</span>}
        </button>
        {this.state.showMonster && this.drawMonsters()}
        {this.state.addMonster && <MonsterForm />}
      </div>
    );
  };
}

export default MonsterManager;
