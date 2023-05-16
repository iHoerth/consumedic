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
      //Dejo comentados otros colores como para probar descomentando:
      main: lightBlue['500'],
      // main: teal['A400'],
      // main: teal['A200'],
      // main: teal[200],

      // main: green['A100'],
      //main: green['A200'],

      // main: cyan['A200'],
      //main: cyan[500],
      main: blue[700],
    },

    secondary: {
      main: teal['A400'],
      main: teal[200],

      // main: cyan[600],

      //main: blue[600],
      //-- main: lightBlue['500']
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

console.log(theme);
export default theme;
