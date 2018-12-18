/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import logo from '../resources/logo.svg';

const header = css`
  position: fixed;
  background-color: #2B2B2B;
  width: 100%;
  height: 55px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
`;

const header__logo = css`
  position: absolute;
  width: 223px;
  height: 21px;
  left: 20px;
  top: 17px;
`;

function Header() {
  return <div css={header}><img src={logo} css={header__logo} alt="Beerforge" /></div>;
}

export default Header;
