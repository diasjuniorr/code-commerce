import '../../styles/globals.css'
import {MuiThemeProvider, CssBaseline, Container, Box} from "@material-ui/core"
import Navbar from "../components/Navbar.tsx"
import theme from "../theme"

function MyApp({ Component, pageProps }) {
  return (
  <MuiThemeProvider theme={theme}>
    <CssBaseline/>
    <Navbar/>
    <Container>
      <Box marginTop={1}>
        <Component {...pageProps} />
      </Box>
    </Container>
  </MuiThemeProvider>
  )
  
}

export default MyApp
