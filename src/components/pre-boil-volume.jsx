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

    const handleVolumeChange = (e) => {
      this.setState({volume: e.target.value});
    }

    const handleBoilChange = (e) => {
      this.setState({boil: e.target.value});
    }
    
    const handleEvapChange = (e) => {
      this.setState({evap: e.target.value});
    }

    const results = () => {
      const result = calculator(this.state.boil, this.state.volume, this.state.evap);
       return !isNaN(result) && isFinite(result) ? result : '';
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
            onChange={handleVolumeChange}
          ></input><br />
          <label htmlFor="boil_length">Boil Length</label><br />
          <input
            name="boil_length"
            type="number"
            value={this.state.boil}
            onChange={handleBoilChange}
          ></input><br />
          <label htmlFor="evap">Evaporation Loss (gal)</label><br />
          <input
            name="evap"
            type="number"
            value={this.state.evap}
            onChange={handleEvapChange}
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

PreBoilVolume.propTypes = {
  calculator: PropTypes.func
};

export default PreBoilVolume;
