import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useMediaQuery, useTheme } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import DrawerComponent from './DrawerComponent';
import { Context } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ component, variant,text, type }) => {
  const { session, setSession } = useContext(Context)[2];
  const navigate = useNavigate();
  const theme = useTheme();
  const screenSizeSmall = useMediaQuery(theme.breakpoints.down('tablet'));
  const { values } = theme.breakpoints;

  const navLinksArray = [
    {
      title: 'Inicio',
      path: '/',
    },
    {
      title: 'Ingresar',
      path: '/login',
    },
    {
      title: 'Eres médico/a?',
      path: '/loginDoctor',
    },
  ];

  /* Estado para ver si se bajo o no */
  const [scrolled, setScrolled] = useState(false);

  const handleSessionClose = () => {
    setSession({});
    navigate('/');
  };
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
        color={variant === 'block' ? 'primary' : scrolled ? 'primary' : 'transparent'}
        elevation={scrolled ? 4 : 0}
        position={variant === 'block' ? 'block' : 'fixed'}
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
            <Link
              href="/"
              color={!scrolled ? 'inherit' : 'white'}
              sx={{ display: 'flex', alignItems: 'center' }}
              underline="none"
            >
              <LocalHospitalIcon color="inherit" />
            </Link>
            <Typography
              variant="h5"
              component="div"
              color={!scrolled ? 'black' : 'white'}
              sx={{
                fontSize: '2rem', // increase the font size to 2rem
              }}
            >
              <Link href="/" color={!scrolled ? 'inherit' : 'white'} underline="none">
                <Box
                  sx={{
                    textShadow: `${
                      !scrolled
                        ? '3px 3px 3px rgba(0,0,0,0.5)'
                        : '2px 2px 2px rgba(255,255,255,0.5)'
                    }`,
                  }}
                >
                  { text === "Mi Cuenta:"  ? (<> Mi cuenta: {type.nombre}<br/> <span style={{fontSize: '50%'}}>{type.email}</span> </>) : 'CONSUMEDIC' }

                 
                </Box>
              </Link>
            </Typography>
          </Box>
          {screenSizeSmall ? (
            <DrawerComponent navLinksArray={navLinksArray} />
          ) : (
            <nav style={{ color: `${!scrolled ? 'black' : 'white'}` }}>
              <Button color="inherit" href={navLinksArray[0].path} sx={{ padding: 2 }}>
                {navLinksArray[0].title}
              </Button>

              {!session.token ? (
                navLinksArray.slice(1).map((link, index) => (
                  <Button key={index} color="inherit" href={link.path} sx={{ padding: 2 }}>
                    {link.title}
                  </Button>
                ))
              ) : (
                <>
                  <Button
                    color="inherit"
                    href={session.isDoctor ? '/perfilMedico' : '/patientpanel'}
                  >
                    MI CUENTA
                  </Button>
                  <Button color="inherit" href="/" onClick={handleSessionClose}>
                    CERRAR SESION
                  </Button>
                </>
              )}
            </nav>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
