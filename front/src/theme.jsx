import { createTheme } from '@mui/material';
import { cyan, teal, green } from '@mui/material/colors';

import '@fontsource/poppins';
import '@fontsource/roboto';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    primary: {
      //Dejo comentados otros colores como para probar descomentando:

      main: teal['A400'],
      // main: teal['A200'],
      // main: teal[200],

      // main: green['A100'],
      // main: green['A200'],

      // main: cyan['A200'],
      // main: cyan[500],
    },

    secondary: {
      main: cyan[500],
    },
  },
  typography: {
    fontFamily: `'Poppins', "Roboto", "Helvetica", "Arial", 'sans-serif'`,
  },
});

console.log(theme);
export default theme;
