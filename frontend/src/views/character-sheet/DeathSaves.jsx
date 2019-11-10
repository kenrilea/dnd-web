import React, { Component } from "react";

class DeathSaves extends Component {
  constructor(props) {
    super(props);
    this.state = { rolls: [] };
  }
  addSuccess = event => {
    this.setState({ rolls: this.state.rolls.concat(true) });
  };
  addFail = event => {
    this.setState({ rolls: this.state.rolls.concat(false) });
  };
  drawSaves = roll => {
    if (roll) {
      return <div className="deathsave-success icon"></div>;
    }
    return <div className="deathsave-failure icon"></div>;
  };
  render = () => {
    let success = this.state.rolls.filter(roll => {
      if (roll) {
        return true;
      }
      return false;
    });
    let failure = this.state.rolls.filter(roll => {
      if (roll) {
        return false;
      }
      return true;
    });
    if (success.length === 3) {
      this.props.stabilize();
      return <div>Die Another Day</div>;
    }
    if (failure.length === 3) {
      return <div>CHARACTER DIES</div>;
    }
    return (
      <div>
        Death Saving Throws
        <div className="stat-wrapper">
          Successes:
          {this.state.rolls
            .filter(roll => {
              if (roll) {
                return true;
              }
              return false;
            })
            .map(this.drawSaves)}
          <button className="deathsave-success" onClick={this.addSuccess}>
            Add
          </button>
        </div>
        <div className="stat-wrapper">
          Failures:
          {this.state.rolls
            .filter(roll => {
              if (roll) {
                return false;
              }
              return true;
            })
            .map(this.drawSaves)}
          <button className="deathsave-failure" onClick={this.addFail}>
            Add
          </button>
        </div>
      </div>
    );
  };
}

export default DeathSaves;
