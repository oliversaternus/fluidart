import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(216, 49, 49)',
      contrastText: '#ffffff',
    }
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("app")
);