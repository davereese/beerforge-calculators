import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PreBoilGravity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      og: '',
      volume: '',
      boil: '',
      evap: '',
    }
  }

  render() {
    const { calculator } = this.props;

    const handleInputChange = (e) => {
      const type = e.target.name;
      this.setState({[type]: e.target.value});
    }

    const results = () => {
      const result = calculator(this.state.og, this.state.boil, this.state.volume, this.state.evap);
       return !isNaN(result) && isFinite(result) ? result : '';
    }

    return (
      <div>
        <h2>Pre-Boil Gravity</h2>
        <div>
          <label htmlFor="og">Original Gravity</label><br />
          <input
            name="og"
            type="number"
            value={this.state.og}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="volume">Post-boil Volume (gal)</label><br />
          <input
            name="volume"
            type="number"
            value={this.state.volume}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="boil">Boil Length</label><br />
          <input
            name="boil"
            type="number"
            value={this.state.boil}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="evap">Evaporation Loss (gal)</label><br />
          <input
            name="evap"
            type="number"
            value={this.state.evap}
            onChange={handleInputChange}
          ></input><br />
        </div>
        <div>
          <h3>Result:</h3>
          <p className="result">{results()}</p>
        </div>
      </div>
    );
  }
}

PreBoilGravity.propTypes = {
  calculator: PropTypes.func
};

export default PreBoilGravity;
