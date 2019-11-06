import React, { Component } from "react";

class StatEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { input: undefined };
  }

  onChange = event => {
    this.setState({ input: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.modifyStat(this.state.input);
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            placeholder="amount"
            onChange={this.onChange}
            value={this.state.input}
            className="stat-input"
          />
          <button className="button-base">Apply</button>
        </form>
      </div>
    );
  };
}
export default StatEditor;
