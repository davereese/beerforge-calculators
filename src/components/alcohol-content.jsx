import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlcoholContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      og: '',
      fg: '',
    }
  }

  render() {
    const { calculator } = this.props;
    let alc = null;

    const handleOGChange = (e) => {
      this.setState({og: e.target.value});
    }

    const handleFGChange = (e) => {
      this.setState({fg: e.target.value});
    }

    const ABVResults = () => {
      const result = calculator(this.state.og, this.state.fg);
      if (!isNaN(result) && isFinite(result) && result > 0) {
        alc = 'ABV';
        return result + '%';
      } else {
          return '';
      }
    }

    return (
      <div>
        <h2>Alcohol Content</h2>
        <div>
          <label htmlFor="og_potential">Original Gravity</label><br />
          <input
            name="og_potential"
            type="number"
            value={this.state.og}
            onChange={handleOGChange}
          ></input><br />
          <label htmlFor="fg_weight">Final Gravity</label><br />
          <input
            name="fg_weight"
            type="number"
            value={this.state.fg}
            onChange={handleFGChange}
          ></input><br />
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
