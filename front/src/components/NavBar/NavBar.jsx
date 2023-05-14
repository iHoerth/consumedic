import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMediaQuery, useTheme } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useState, useEffect } from 'react';

import DrawerComponent from './DrawerComponent';

const NavBar = () => {
  const theme = useTheme();
  const screenSizeSmall = useMediaQuery(theme.breakpoints.down('tablet'));
  const { values } = theme.breakpoints;

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

  /* Estado para ver si se bajo o no */
  const [scrolled, setScrolled] = useState(false);

  /*listener de eventos de scroll a la ventana */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar
        color={scrolled ? 'secondary' : 'transparent'}
        position="fixed"
        sx={{ height: '100px', justifyContent: 'center', alignItems: 'center' }}
      >
        <Toolbar
          color="white"
          sx={{
            width: {
              mobile: '100vw',
              tablet: '100vw',
              laptop: '100vw',
              desktop: values.desktop,
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap="10px"
            color={!scrolled ? 'black' : 'white'}
            sx={{ flexGrow: 1 }}
          >
            <LocalHospitalIcon color="inherit" />
            <Typography variant="h5" component="div" color={!scrolled ? 'black' : 'white'}>
              CONSUMEDIC
            </Typography>
          </Box>
          {screenSizeSmall ? (
            <DrawerComponent navLinksArray={navLinksArray} />
          ) : (
            <nav style={{ color: `${!scrolled ? 'black' : 'white'}` }}>
              {navLinksArray.map((link, index) => (
                <Button key={index} color="inherit" href={link.path}>
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
