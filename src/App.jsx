/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core'

import Header from './components/header';
import * as Calculator from './components/calculator';
import OG from './components/og';

const lightBrown = '#58382a';
const darkBrown = '#191919';
const white = '#fff;';
const yellow = '#f4d03f';

const page = css`
  padding: 100px 50px 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(125.4deg, ${lightBrown} 0%, ${darkBrown} 118.45%);
  box-sizing border-box;
`;

const card = css`
  display: inline-block;
  padding: 20px;
  background-color: rgba(233,102,44,0.15);
  box-sizing border-box;
  color: ${white}

  label {
    color: ${yellow};
  }
`;

class App extends Component {
  render() {
    return (
      <div css={page} className="App">
        <Header />
        <div css={card}>
          <OG calculator={Calculator.OG} />
        </div>
      </div>
    );
  }
}

export default App;
