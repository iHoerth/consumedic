import { createTheme } from '@mui/material';
import { cyan, teal, green, blue, lightBlue } from '@mui/material/colors';

import '@fontsource/poppins';
import '@fontsource/roboto';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: blue[500],
      light: lightBlue['400'],
      dark: blue[800],
    },
    secondary: {
      main: cyan[200],
      light: teal['A100'],
      dark: teal[500],
    },
  },
  typography: {
    fontFamily: `'Poppins', "Roboto", "Helvetica", "Arial", 'sans-serif'`,
  },

  components: {
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          fontSize: '16px',
        },
      },
    },
  },
});

export default theme;
