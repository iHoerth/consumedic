import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import ContextProvider from './context/ContextProvider Implementacion 2';

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {/* <ContextProvider> */}
        <CssBaseline />
        <App />
      {/* </ContextProvider> */}
    </ThemeProvider>
  </BrowserRouter>
);
