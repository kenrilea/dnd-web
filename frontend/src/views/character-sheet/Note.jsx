import React, { Component } from "react";
import { connect } from "react-redux";
import { loadNotes } from "../../network-action.js";

class UnconnectedNote extends Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.data.title, body: this.props.data.body };
  }
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = event => {
    event.preventDefault();
    this.setState({ editing: false });
  };
  toggleEdit = event => {
    this.setState({ editing: true });
  };
  render = () => {
    if (this.state.editing) {
      return (
        <div>
          <form onSubmit={this.submitHandler}>
            <div>
              <input
                value={this.state.title}
                className="input-subheader"
                onChange={this.inputHandler}
                name="title"
              />
            </div>
            <div>
              <textarea
                value={this.state.body}
                className="input-area"
                onChange={this.inputHandler}
                name="body"
              />
            </div>
            <button className="button-base">Submit</button>
          </form>
        </div>
      );
    }
    return (
      <div>
        <div className="item-header">{this.state.title}</div>
        <div>{this.state.body}</div>
        <button onClick={this.toggleEdit} className="button-base">
          Edit
        </button>
      </div>
    );
  };
}

const Note = connect()(UnconnectedNote);
export default Note;
