import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import DrawerComponent from './DrawerComponent';

export default function ButtonAppBar() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CONSUMEDIC
          </Typography>
          {isMatch ? (
            <DrawerComponent />
          ) : (
            <>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Eres un medico?</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
