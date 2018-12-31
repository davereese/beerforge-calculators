import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ApparentAttenuation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      og: '',
      fg: '',
    }
  }

  render() {
    const { calculator } = this.props;
    let atten = null;

    const handleInputChange = (e) => {
      const type = e.target.name;
      this.setState({[type]: e.target.value});
    }

    const attenuationResults = () => {
      const result = calculator(this.state.og, this.state.fg);
      if (!isNaN(result) && isFinite(result) && result > 0 && result <= 100) {
        atten = 'attenuation';
        return result + '%';
      } else {
          return '';
      }
    }

    return (
      <div>
        <h2>Apparent<br />Attenuation</h2>
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
        </div>
        <div>
          <h3>Result:</h3>
          <p className="result">{attenuationResults()} <label>{atten}</label></p>
        </div>
      </div>
    );
  }
}

ApparentAttenuation.propTypes = {
  calculator: PropTypes.func,
};

export default ApparentAttenuation;
