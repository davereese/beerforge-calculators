import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StrikeTemperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: '',
      temp1: '',
      temp2: '',
    }
  }

  render() {
    const { calculator } = this.props;
    let label = null;

    const handleRatioChange = (e) => {
      this.setState({ratio: e.target.value});
    }

    const handleTemp1Change = (e) => {
      this.setState({temp1: e.target.value});
    }

    const handleTemp2Change = (e) => {
      this.setState({temp2: e.target.value});
    }

    const results = () => {
      const result = calculator(this.state.temp1, this.state.temp2, this.state.ratio);
      if (!isNaN(result) && isFinite(result) && result > 0) {
        label = '(°F)';
        return result;
      }
    }

    return (
      <div>
        <h2>Strike Water<br />Temperature</h2>
        <div>
          <label htmlFor="ratio">Quarts per lb of grain</label><br />
          <input
            name="ratio"
            type="number"
            value={this.state.ratio}
            onChange={handleRatioChange}
          ></input><br />
          <label htmlFor="temp1">Grain Temperature (°F)</label><br />
          <input
            name="temp1"
            type="number"
            value={this.state.temp1}
            onChange={handleTemp1Change}
          ></input><br />
          <label htmlFor="temp2">Target Temperature (°F)</label><br />
          <input
            name="temp2"
            type="number"
            value={this.state.temp2}
            onChange={handleTemp2Change}
          ></input><br />
        </div>
        <div>
          <h3>Result:</h3>
          <p className="result">{results()} <label>{label}</label></p>
        </div>
      </div>
    );
  }
}

StrikeTemperature.propTypes = {
  calculator: PropTypes.func
};

export default StrikeTemperature;
