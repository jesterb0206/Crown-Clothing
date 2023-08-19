import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    color: black;
    text-decoration: none;
  }

	body {
		font-family: 'Open Sans Condensed';
		padding: 20px 40px;

		@media screen and (max-width: 800px) {
			padding: 10px;
		}
	}
`;
