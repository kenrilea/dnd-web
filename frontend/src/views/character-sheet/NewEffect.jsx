import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedNewEffect extends Component {
  constructor(props) {
    super(props);
    this.state = { persists: false };
  }
  inputHandler = event => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };
  submitHandler = event => {
    event.preventDefault();
    if (this.state.persists) {
      this.props.dispatch({ type: "addTrait", data: this.state });
      this.props.submit();
      return;
    }
    this.props.dispatch({ type: "addEffect", data: this.state });
    this.props.submit();
    return;
  };
  togglePersists = event => {
    this.setState({ persists: event.target.value });
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              name="name"
              className="input-base"
              placeholder="Name"
              onChange={this.inputHandler}
            />
          </div>
          <div>
            <input
              name="duration"
              className="input-base"
              onChange={this.inputHandler}
              placeholder="Duration"
            />
            <input
              name="regeneratesOn"
              className="input-base"
              onChange={this.inputHandler}
              placeholder="Regenerates On"
            />
          </div>
          <textarea
            name="description"
            className="input-base"
            onChange={this.inputHandler}
            placeholder="Description"
          />
          <button className="button-base">Add</button>
          Persistent
          <input
            type="checkbox"
            onChange={this.togglePersists}
            value={this.state.persists}
          />
        </form>
      </div>
    );
  };
}

const NewEffect = connect()(UnconnectedNewEffect);
export default NewEffect;
