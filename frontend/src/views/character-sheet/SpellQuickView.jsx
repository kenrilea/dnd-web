import React, { Component } from "react";

class SpellQuickView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    return (
      <div className="stat-wrapper card-style">
        <div className="item-header">{this.props.spell.spell_name}</div>
        <div className="borderless-wrapper">
          <div>Casting Time{": " + this.props.spell.casting_time}</div>
          <div>Range{": " + this.props.spell.range}</div>
        </div>
        <div className="borderless-wrapper">
          <div>Save{": " + this.props.spell.save}</div>
          <div>Damage{": " + this.props.spell.damage}</div>
        </div>
      </div>
    );
  };
}

export default SpellQuickView;
