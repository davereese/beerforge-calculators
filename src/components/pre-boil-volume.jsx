import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PreBoilVolume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boil: '',
      volume: '',
      evap: '',
    }
  }

  render() {
    const { calculator } = this.props;
    let vol = null;

    const handleInputChange = (e) => {
      const type = e.target.name;
      this.setState({[type]: e.target.value});
    }

    const results = () => {
      const result = calculator(this.state.boil, this.state.volume, this.state.evap);
       if (!isNaN(result) && isFinite(result)) {
         vol = 'gal';
         return result;
       }
    }

    return (
      <div>
        <h2>Pre-Boil Volume</h2>
        <div>
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
          <p className="result">{results()} <label>{vol}</label></p>
        </div>
      </div>
    );
  }
}

PreBoilVolume.propTypes = {
  calculator: PropTypes.func
};

export default PreBoilVolume;
