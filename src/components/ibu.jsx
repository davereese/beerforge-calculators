import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IBU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aa: '',
      weight: '',
      length: '',
      type: '',
      og: '',
      vol: '',
      formula: 'tinseth',
    }
  }

  render() {
    const { calculator } = this.props;
    let label = null;

    const handleInputChange = (e) => {
      const type = e.target.name;
      this.setState({[type]: e.target.value});
    }

    const handleCheckboxChange = (e) => {
      const value = this.state.formula === 'tinseth' ? 'rager' : 'tinseth';
      this.setState({formula: value});
    }

    const results = () => {
      const result = calculator([{aa: this.state.aa, weight: this.state.weight, length: this.state.length, type: this.state.type}], this.state.og, this.state.vol, this.state.formula);
      if (!isNaN(result) && isFinite(result) && result > 0) {
        label = 'IBU';
        return result;
      } else {
          return '';
      }
    }

    return (
      <div>
        <h2>IBU</h2>
        <div>
          <label htmlFor="aa">Hop Alpha Acid</label><br />
          <input
            name="aa"
            type="number"
            value={this.state.aa}
            onChange={handleInputChange}
            autoComplete="none"
          ></input><br />
          <label htmlFor="weight">Hop Weight (oz)</label><br />
          <input
            name="weight"
            type="number"
            value={this.state.weight}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="length">Hop Time In Boil</label><br />
          <input
            name="length"
            type="number"
            value={this.state.length}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="type">Hop Type</label><br />
          <select
            name="type"
            value={this.state.type}
            onChange={handleInputChange}
          >
            <option value="whole">Whole Leaf</option>
            <option value="pellet">Pellet</option>
          </select><br />
          <label htmlFor="og">Original Gravity</label><br />
          <input
            name="og"
            type="number"
            value={this.state.og}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="vol">Final Volume (gal)</label><br />
          <input
            name="vol"
            type="number"
            value={this.state.vol}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="ibuFormula">Tinseth</label>
          <input
            type="checkbox"
            id="ibuFormula"
            name="formula"
            value={this.state.formula}
            onChange={handleCheckboxChange}
          ></input>
          <label htmlFor="ibuFormula"><span className="toggle"></span>Rager</label><br />
        </div>
        <div>
          <h3>Result:</h3>
          <p className="result">{results()} <label>{label}</label></p>
        </div>
      </div>
    );
  }
}

IBU.propTypes = {
  calculator: PropTypes.func
};

export default IBU;
