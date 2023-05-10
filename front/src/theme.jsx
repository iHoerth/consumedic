import { createTheme } from '@mui/material';
import { cyan, teal, green, blue } from '@mui/material/colors';

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

      // main: teal['A400'],
      // main: teal['A200'],
      // main: teal[200],

      // main: green['A100'],
      // main: green['A200'],

      // main: cyan['A200'],
      // main: cyan[500],
      main: blue[500],
    },

    secondary: {
      main: teal['A400'],
    },
  },
  typography: {
    fontFamily: `'Poppins', "Roboto", "Helvetica", "Arial", 'sans-serif'`,
  },
});

console.log(theme);
export default theme;
