import React, { Component } from "react";
import { connect } from "react-redux";
import proxy from "../../proxy.js";
import { loadNotes } from "../../network-action.js";
import Note from "./Note.jsx";

class UnconnectedNotes extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: this.props.notes };
  }
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    let newNote = {
      title: this.state.noteTitle,
      body: this.state.noteBody
    };
    let allNotes = [newNote];
    allNotes = allNotes.concat(this.state.notes);
    data.append("notes", JSON.stringify(allNotes));
    data.append("charId", this.props.id);
    fetch(proxy + "/character/notes", {
      method: "POST",
      body: data,
      credentials: "include"
    }).then(result => {
      console.log("notes written to db");
    });
    this.setState({ notes: allNotes });
  };
  loadNotes = async () => {
    let notes = await loadNotes(this.props.id);
    this.setState({ notes });
    this.props.dispatch({ type: "loadNotes", notes });
  };
  toggleForm = event => {
    this.setState({ adding: !this.state.adding });
  };
  renderNote = noteData => {
    return <Note data={noteData} />;
  };
  render = () => {
    console.log(this.state);
    if (this.props.notes === undefined) {
      this.loadNotes(this.props.id);
      return <div>Loading...</div>;
    }
    if (this.state.notes === undefined) {
      return <div>Loading...</div>;
    }
    return (
      <div className="wrapper-note">
        <div className="category-header">Notes</div>
        {this.state.adding && (
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              onChange={this.inputHandler}
              name="noteTitle"
              value={this.state.noteTitle}
              className="input-subheader"
              placeholder="Note Title"
            />
            <textarea
              onChange={this.inputHandler}
              name="noteBody"
              value={this.state.noteBody}
              className="input-area"
              placeholder="Note Body"
            />
            <div>
              <button className="button-base">Add</button>
            </div>
          </form>
        )}
        <button className="button-base" onClick={this.toggleForm}>
          {this.state.adding ? "Hide" : "New Note"}
        </button>
        <div>{this.state.notes.map(this.renderNote)}</div>
      </div>
    );
  };
}

const mapState = state => {
  console.log(state);
  return {
    notes: state.notes,
    id: state.activeChar
  };
};

const Notes = connect(mapState)(UnconnectedNotes);
export default Notes;
