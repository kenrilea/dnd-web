import React, { Component } from "react";
import { connect } from "react-redux";
import NewEffect from "./NewEffect.jsx";

class UnconnectedEffects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  removeEffect = event => {
    this.props.dispatch({ type: "removeEffect", name: event.target.name });
    return;
  };
  drawEffect = effect => {
    return (
      <div className="stat-wrapper">
        <div>
          <div className="item-header">{effect.name}</div>
          <div>{effect.description}</div>
          {effect.duration && <div>Duration{": " + effect.duration}</div>}
          {effect.regeneratesOn && (
            <div>Regenerates: On{" " + effect.regeneratesOn}</div>
          )}
        </div>
        {effect.duration && (
          <button
            className="button-base filled"
            onClick={this.removeEffect}
            name={effect.name}
          >
            Remove
          </button>
        )}
      </div>
    );
  };
  toggleAdd = event => {
    this.setState({ adding: !this.state.adding });
  };
  render = () => {
    return (
      <div className="wrapper">
        <div className="category-header">Features & Traits</div>
        <div>
          <div className="subcategory-header">Persistent</div>
          {this.props.traits.map(this.drawEffect)}
        </div>
        <div>
          <div className="subcategory-header">Temporary</div>
          {this.props.effects.map(this.drawEffect)}
          <button onClick={this.toggleAdd} className="button-base">
            Add Effect
          </button>
          {this.state.adding && <NewEffect submit={this.toggleAdd} />}
        </div>
      </div>
    );
  };
}

const mapState = state => {
  return {
    traits: state.char.featuresAndTraits,
    effects: state.char.effects
  };
};

const Effects = connect(mapState)(UnconnectedEffects);
export default Effects;
