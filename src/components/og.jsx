import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      potential: '',
      weight: '',
      efficiency: '',
      volume: '',
    }
  }

  render() {
    const { calculator } = this.props;

    const handlePotentialChange = (e) => {
      this.setState({potential: e.target.value});
    }

    const handleWeightChange = (e) => {
      this.setState({weight: e.target.value});
    }

    const handleEfficiencyChange = (e) => {
      this.setState({efficiency: e.target.value});
    }

    const handleVolumeChange = (e) => {
      this.setState({volume: e.target.value});
    }

    const results = () => {
      const result = calculator([{potential: this.state.potential, weight: this.state.weight}], this.state.efficiency, this.state.volume);
       return !isNaN(result) && isFinite(result) ? result : '';
    }

    return (
      <div>
        <h2>Calculate OG</h2>
        <div>
          <label htmlFor="malt_potential">Malt Potential</label><br />
          <input
            name="malt_potential"
            type="number"
            value={this.state.potential}
            onChange={handlePotentialChange}
          ></input><br />
          <label htmlFor="malt_weight">Malt Weight (lbs.)</label><br />
          <input
            name="malt_weight"
            type="number"
            value={this.state.weight}
            onChange={handleWeightChange}
          ></input><br />
          <label htmlFor="efficiency">Mash Efficiency (%)</label><br />
          <input
            name="efficiency"
            type="number"
            value={this.state.efficiency}
            onChange={handleEfficiencyChange}
          ></input><br />
          <label htmlFor="volume">Post-boil Volume</label><br />
          <input
            name="volume"
            type="number"
            value={this.state.volume}
            onChange={handleVolumeChange}
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

OG.propTypes = {
  calculator: PropTypes.func
};

export default OG;
