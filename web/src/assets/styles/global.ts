import { createGlobalStyle } from 'styled-components'

import theme from './themes/default'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${theme.fonts.family.primary};
  }

  body {
    font-size:  1rem ;
    background: ${theme.colors.background};
    -webkit-font-smoothing: antialiased !important;
  }


  button{
    cursor: pointer;
  }
`
