import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import ContextProvider from './context/ContextProvider';

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
        <ContextProvider>
          <CssBaseline />
          <App />
        </ContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);


// l-d

// import * as React from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { createTheme } from '@mui/material/styles';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import theme from './theme';

// import ContextProvider from './context/ContextProvider';

// import App from './App';

// import './index.css';

// function Index() {
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

//   const customTheme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: prefersDarkMode ? 'dark' : 'light',
//           primary: {
//             main: '#90caf9',
//           },
//           secondary: {
//             main: '#f48fb1',
//           },
//         },
//       }),
//     [prefersDarkMode],
//   );

//   return (
//     <ThemeProvider theme={customTheme}>
//       <CssBaseline />
//       <BrowserRouter>
//         <ThemeProvider theme={theme}>
//           <ContextProvider>
//             <App />
//           </ContextProvider>
//         </ThemeProvider>
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Index />);

