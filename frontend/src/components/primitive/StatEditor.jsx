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
            onChange={this.currentHandler}
            value={this.state.input}
          />
          <button className="button-basic">Apply</button>
        </form>
      </div>
    );
  };
}
export default StatEditor;
