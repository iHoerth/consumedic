import { createTheme } from '@mui/material';
import { cyan, teal, green } from '@mui/material/colors';

const theme = createTheme({
  palette:{
    primary:{
      //Dejo comentados otros colores como para probar descomentando:

      main: teal['A200'],
      // main: teal[200],
      
      
      // main: green['A100'],
      // main: green['A200'],
      
      // main: cyan['A200'],
      // main: cyan[500],

    },
    
    secondary:{
      main: cyan[500]
    }
  },
  
});

console.log(theme)
export default theme;