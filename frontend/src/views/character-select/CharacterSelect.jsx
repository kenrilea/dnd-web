import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import proxy from "../../proxy.js";

class UnconnectedCharacterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { chars: undefined };
  }
  loadCharList = async () => {
    let res = await fetch(proxy + "/character/list", {
      method: "GET",
      credentials: "include"
    });
    let charIds = await res.text();
    console.log(charIds);
    charIds = JSON.parse(charIds);
    let charList = await Promise.all(
      charIds.map(async id => {
        const charres = await fetch(proxy + "/character/stats?id=" + id);
        let charData = await charres.text();
        charData = JSON.parse(charData);
        return JSON.parse(charData.data.charData);
      })
    );
    this.setState({ chars: charList });
  };
  selectChar = async event => {
    let charId = event.target.name;
    console.log("fetching char data for " + charId);
    let path = proxy + "/character/stats?id=" + charId;
    let newChar = undefined;
    let res = await fetch(path);
    let body = await res.text();
    body = JSON.parse(body);
    if (body.success === false) {
      console.log(body);
      return;
    } else {
      newChar = JSON.parse(body.data.charData);
      console.log("retreived char " + newChar.baseInfo.name);
    }
    this.props.dispatch({ type: "chooseChar", charData: newChar });
  };
  drawChars = char => {
    console.log(char);
    return (
      <Link to="/character-sheet">
        <button
          onClick={this.selectChar}
          name={char.baseInfo.id}
          className="button-base"
        >
          {char.baseInfo.name} Level{" "}
          {char.baseInfo.level + " " + char.baseInfo.class}
        </button>
      </Link>
    );
  };
  render = () => {
    if (this.state.chars === undefined) {
      this.loadCharList();
      return <div>Loading......</div>;
    }
    return <div>{this.state.chars.map(this.drawChars)}</div>;
  };
}

const CharacterSelect = connect()(UnconnectedCharacterSelect);
export default CharacterSelect;
