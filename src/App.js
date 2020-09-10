import React from 'react';
import './App.css';
import Conversation from './Conversation/Conversation';
import { ConfigProvider } from './Context/ConfigContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// use default theme
// const theme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009933'
    },
  }
});

function App() {
  return (
    <ConfigProvider>
      <MuiThemeProvider theme={theme}>
        <Conversation />
      </MuiThemeProvider>
    </ConfigProvider>
  );
}

export default App;
