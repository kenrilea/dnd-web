import React, { Component } from "react";

class SpellQuickView extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  displayFull = () => {
    this.setState({ expanded: true });
  };
  collapse = () => {
    this.setState({ expanded: false });
  };
  drawFull = () => {
    return (
      <div className="min-wrapper" className="tooltip">
        <div className="item-header">Description</div>
        <div>{this.props.spell.description}</div>
      </div>
    );
  };
  render = () => {
    return (
      <div
        className="card-style"
        onMouseEnter={this.displayFull}
        onMouseLeave={this.collapse}
      >
        <div className="stat-wrapper">
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
        {this.state.expanded && this.drawFull()}
      </div>
    );
  };
}

export default SpellQuickView;
