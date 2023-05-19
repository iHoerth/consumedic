import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import ContextProvider from './context/ContextProvider';

import theme from './theme';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <CssBaseline />
        <App />
      </ContextProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

