import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#155799',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ebeef0',
      contrastText: '#000000',
    },
    action: {
      disabledBackground: '#09421d'
    },
    background: {
      default: '#2f2f33'
    }
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("app")
);