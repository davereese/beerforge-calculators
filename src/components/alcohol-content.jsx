import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlcoholContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      og: '',
      fg: '',
      formula: 'ABV',
    }
  }

  render() {
    const { calculator } = this.props;
    let alc = null;

    const handleInputChange = (e) => {
      const type = e.target.name;
      this.setState({[type]: e.target.value});
    }

    const handleCheckboxChange = (e) => {
      const value = this.state.formula === 'ABV' ? 'ABW' : 'ABV';
      this.setState({formula: value});
    }

    const ABVResults = () => {
      const result = calculator(this.state.og, this.state.fg, this.state.formula);
      if (!isNaN(result) && isFinite(result) && result > 0) {
        alc = this.state.formula;
        return result + '%';
      } else {
          return '';
      }
    }

    return (
      <div>
        <h2>Alcohol Content</h2>
        <div>
          <label htmlFor="og">Original Gravity</label><br />
          <input
            name="og"
            type="number"
            value={this.state.og}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="fg">Final Gravity</label><br />
          <input
            name="fg"
            type="number"
            value={this.state.fg}
            onChange={handleInputChange}
          ></input><br />
          <label htmlFor="abvFormula">ABV</label>
          <input
            type="checkbox"
            id="abvFormula"
            name="formula"
            value={this.state.formula}
            onChange={handleCheckboxChange}
          ></input>
          <label htmlFor="abvFormula"><span className="toggle"></span>ABW</label><br />
        </div>
        <div>
          <h3>Result:</h3>
          <p className="result">{ABVResults()} <label>{alc}</label></p>
        </div>
      </div>
    );
  }
}

AlcoholContent.propTypes = {
  calculator: PropTypes.func
};

export default AlcoholContent;
