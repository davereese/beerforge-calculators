/** @jsx jsx */

import React, { Component } from 'react';
import { jsx, css } from '@emotion/core'

import Header from './components/header';

const lightBrown = '#58382A';
const darkBrown = '#191919';

const page = css`
  background: linear-gradient(125.4deg, ${lightBrown} 0%, ${darkBrown} 118.45%);
  width: 100%;
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <div css={page} className="App">
        <Header />
      </div>
    );
  }
}

export default App;
