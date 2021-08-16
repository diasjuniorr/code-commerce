import '../../styles/globals.css'
import {MuiThemeProvider, CssBaseline, Container, Box} from "@material-ui/core"
import theme from "../theme"

function MyApp({ Component, pageProps }) {
  return (
  <MuiThemeProvider theme={theme}>
    <CssBaseline/>
    <Container>
      <Box marginTop={1}>
        <Component {...pageProps} />
      </Box>
    </Container>
  </MuiThemeProvider>
  )
  
}

export default MyApp
