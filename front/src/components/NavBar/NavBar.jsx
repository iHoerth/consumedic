import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMediaQuery, useTheme } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import DrawerComponent from './DrawerComponent';

const NavBar = () => {
  const theme = useTheme();
  const screenSizeSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const navLinksArray = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Login',
      path: '/login',
    },
    {
      title: 'Eres un medico?',
      path: '/login',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: '100px', justifyContent: 'center' }}>
        <Toolbar color="white">
          <Box display="flex" alignItems="center" gap="4px" color="white" sx={{ flexGrow: 1 }}>
            <LocalHospitalIcon color="inherit"></LocalHospitalIcon>
            <Typography variant="h5" component="div" color="white">
              CONSUMEDIC
            </Typography>
          </Box>
          {screenSizeSmall ? (
            <DrawerComponent navLinksArray={navLinksArray} />
          ) : (
            <nav style={{ color: 'white' }}>
              {navLinksArray.map((link) => (
                <Button color="inherit" href={link.path}>
                  {link.title}
                </Button>
              ))}
            </nav>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
