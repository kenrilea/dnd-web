import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import proxy from '../../proxy.js'

class UnconnectedCharacterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { chars: [] };
  }
  loadCharList = async () => {
    let res = await fetch(proxy + "/test/characters");
    let charList = await res.text();
    charList = JSON.parse(charList);
    this.setState({ chars: charList });
  };
  selectChar = async event => {
    let charId = event.target.name;
    console.log("fetching char data for " + charId);
    let path = proxy + "/test/get-char?id=" + charId;
    let newChar = undefined;
    let res = await fetch(path);
    let body = await res.text();
    body = JSON.parse(body);
    if (body.success === false) {
      console.log(err);
    } else {
      newChar = body.charData;
      console.log("retreived char " + newChar.baseInfo.name);
    }
    this.props.dispatch({ type: "chooseChar", charData: newChar });
  };
  drawChars = char => {
    return (
      <Link to="/character-sheet">
        <button
          onClick={this.selectChar}
          name={char.id}
          className="button-base"
        >
          {char.name} Level {char.level + " " + char.class}
        </button>
      </Link>
    );
  };
  render = () => {
    if (this.state.chars.length < 1) {
      this.loadCharList();
      return <div>Loading......</div>;
    }
    return <div>{this.state.chars.map(this.drawChars)}</div>;
  };
}

const CharacterSelect = connect()(UnconnectedCharacterSelect);
export default CharacterSelect;
