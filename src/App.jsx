/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core'

import Header from './components/header';
import * as Calculator from './utils/calculator.js';
import OriginalGravity from './components/og';
import PreBoilGravity from './components/pre-boil-gravity';
import PreBoilVolume from './components/pre-boil-volume';
import FinalGravity from './components/fg';
import AlcoholContent from './components/alcohol-content';
import ApparentAttenuation from './components/apparent-attenuation';
import StrikeTemperature from './components/strike-temperature';
import StrikeVolume from './components/strike-volume';
import TotalWater from './components/total-water';
import SpargeVolume from './components/sparge-volume';
import EvaporationPercent from './components/evap-percent';
import YeastTargetPitchingRate from './components/yeast-target';
import YeastPitchingRate from './components/yeast-rate';
import SRM from './components/srm';
import IBU from './components/ibu';
import CO2 from './components/co2';

const lightBrown = '#58382a';
const darkBrown = '#191919';
const white = '#fff;';
const yellow = '#f4d03f';

const page = css`
  padding: 90px 50px 50px;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(125.4deg, ${lightBrown} 0%, ${darkBrown} 118.45%);
  box-sizing border-box;
`;

const h1 = css`
  margin-bottom: 10px;
  color: white;
  text-align: center;
  font-size: 20px;
`;

const p = css`
  margin: 0 auto 20px;
  max-width: 650px;
  color: white;
  text-align: center;
  line-height: 1.3;

  span {
    line-height: 2;
  }
`;

const container = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const card = css`
  display: inline-block;
  padding: 20px;
  margin: 15px 20px;
  background-color: rgba(233,102,44,0.15);
  box-sizing border-box;
  color: ${white}
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);

  label {
    color: ${yellow};
  }
`;

class App extends Component {
  render() {
    return (
      <div css={page} className="App">
        <Header />
        <h1 css={h1}>Welcome to BeerForge.</h1>
        <p css={p}>We have a ton of awesome stuff planned for this homebrewing app, but for now we hope you find our calculators helpful and fun. Keep an eye on us for complete recipie builders, brew logs and more, coming soon.<br /><span>-Cheers</span></p>
        <div css={container}>
          <div css={card}>
            <TotalWater calculator={Calculator.totalWater} />
          </div>
          <div css={card}>
            <StrikeVolume calculator={Calculator.strikeVolume} />
          </div>
          <div css={card}>
            <StrikeTemperature calculator={Calculator.strikeTemp} />
          </div>
          <div css={card}>
            <SpargeVolume calculator={Calculator.spargeVolume} />
          </div>
          <div css={card}>
            <EvaporationPercent calculator={Calculator.evaporationPercent} />
          </div>
          <div css={card}>
            <PreBoilVolume calculator={Calculator.preBoilVol} />
          </div>
          <div css={card}>
            <OriginalGravity calculator={Calculator.OG} />
          </div>
          <div css={card}>
            <PreBoilGravity calculator={Calculator.preBoilG} />
          </div>
          <div css={card}>
            <YeastTargetPitchingRate calculator={Calculator.targetPitchingRate} />
          </div>
          <div css={card}>
            <YeastPitchingRate calculator={Calculator.pitchingRate} />
          </div>
          <div css={card}>
            <FinalGravity calculator={Calculator.FG} />
          </div>
          <div css={card}>
            <AlcoholContent calculator={Calculator.alcoholContent} />
          </div>
          <div css={card}>
            <ApparentAttenuation calculator={Calculator.attenuation} />
          </div>
          <div css={card}>
            <IBU calculator={Calculator.IBU} />
          </div>
          <div css={card}>
            <SRM calculator={Calculator.SRM} />
          </div>
          <div css={card}>
            <CO2 calculator={Calculator.CO2} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
