import { ThemeProvider } from 'styled-components'

import GlobalStyles from './assets/styles/global'
import theme from './assets/styles/themes/default'

import Home from './page/Home'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Home />
      </ThemeProvider>
    </>
  )
}

export default App
