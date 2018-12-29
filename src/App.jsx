/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core'

import Header from './components/header';
import * as Calculator from './utils/calculator';
import OriginalGravity from './components/og';
import PreBoilGravity from './components/pre-boil-gravity';
import PreBoilVolume from './components/pre-boil-volume';
import FinalGravity from './components/fg';
import AlcoholContent from './components/alcohol-content';

const lightBrown = '#58382a';
const darkBrown = '#191919';
const white = '#fff;';
const yellow = '#f4d03f';

const page = css`
  padding: 100px 50px 0;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(125.4deg, ${lightBrown} 0%, ${darkBrown} 118.45%);
  box-sizing border-box;
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
        <div css={container}>
          <div css={card}>
            <OriginalGravity calculator={Calculator.OG} />
          </div>
          <div css={card}>
            <PreBoilVolume calculator={Calculator.preBoilVol} />
          </div>
          <div css={card}>
            <PreBoilGravity calculator={Calculator.PreBoilG} />
          </div>
          <div css={card}>
            <FinalGravity calculator={Calculator.FG} />
          </div>
          <div css={card}>
            <AlcoholContent calculator={Calculator.alcoholContent} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
