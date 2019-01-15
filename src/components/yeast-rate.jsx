import React, { Component } from 'react';
import PropTypes from 'prop-types';

class YeastPitchingRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      og: '',
      volume: '',
      type: 'liquid',
      number: '',
      date: '',
      grams: '',
      cells: '',
    }
  }

  render() {
    const { calculator } = this.props;
    let label = '';

    const handleInputChange = (e) => {
      const type = e.target.name;
      this.setState({[type]: e.target.value});
    }

    const results = () => {
      const result = calculator(this.state.type, this.state.number, this.state.date, this.state.grams, this.state.cells);
      if (!isNaN(result) && isFinite(result) && result > 0) {
        label = 'billion cells';
        return result;
      } else {
        label = '';
      }
    }

    return (
      <div>
        <h2>Total Yeast Cells</h2>
        <div>
          <label htmlFor="type">Yeast Type</label><br />
          <select
            name="type"
            value={this.state.target}
            onChange={handleInputChange}
          >
            <option value="liquid">Liquid (pack/vial)</option>
            <option value="dry">Dry</option>
          </select><br />
          {this.state.type === 'liquid' &&
            <div>
              <label htmlFor="number">Number of Liquid Packs</label><br />
              <input
                name="number"
                type="number"
                value={this.state.number}
                onChange={handleInputChange}
              ></input><br />
              <label htmlFor="date">Manufactured Date</label><br />
              <input
                name="date"
                type="date"
                value={this.state.date}
                onChange={handleInputChange}
              ></input><br />
            </div>
          }
          {this.state.type === 'dry' &&
            <div>
              <label htmlFor="grams">Grams of Dry Yeast</label><br />
              <input
                name="grams"
                type="number"
                value={this.state.grams}
                onChange={handleInputChange}
              ></input><br />
              <label htmlFor="cells">Bn Cells/gram</label><br />
              <input
                name="cells"
                type="number"
                value={this.state.cells}
                onChange={handleInputChange}
                placeholder="10"
              ></input><br />
            </div>
          }
        </div>
        <div>
          <h3>Result:</h3>
          <p className="result">{results()} <label>{label}</label></p>
        </div>
      </div>
    );
  }
}

YeastPitchingRate.propTypes = {
  calculator: PropTypes.func
};

export default YeastPitchingRate;
