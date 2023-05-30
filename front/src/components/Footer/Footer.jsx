import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { BottomNavigation, BottomNavigationAction, Typography, Box } from '@mui/material';
import {
  Home,
  Info,
  Lock,
  Facebook,
  Comment,
  Twitter,
  Instagram,
  People,
  RateReview,
} from '@mui/icons-material';
import {Tooltip} from '@mui/material'
import { useLocation } from 'react-router-dom';
const preventDefault = (event) => event.preventDefault();

const Footer = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const theme = useTheme();
  const location = useLocation();
  const doctorDashboard = location.pathname !== '/perfilMedico';

  const handleNavigation = (event, page) => {
    let newHeight = 0;
    switch (page) {
      case 'home':
        newHeight = 0;
        break;
      case 'about':
        newHeight = theme.heights.homeSection * 1;
        break;
      case 'testimonials':
        newHeight = theme.heights.homeSection * 2;
        break;
      case 'team':
        newHeight = theme.heights.homeSection * 2;
        break;
    }
    const scrollTo = newHeight; // Valor de desplazamiento personalizado (en este caso, 40% de la altura de la ventana)
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    setCurrentPage(page);

  };

  return (
    <AppBar
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      color={location.pathname === '/perfilMedico' ? 'secondary' : 'primary'}
    >
      <Box
        sx={{
          p: 1,
          width: '100%',
          // bgcolor: theme.palette.primary.main,
        }}
        color={location.pathname === '/perfilMedico' ? 'secondary' : 'primary'}

      >
        <BottomNavigation
          value={currentPage}
          onChange={handleNavigation}
          sx={{
            bgcolor: location.pathname === '/perfilMedico' ? theme.palette.secondary.main : theme.palette.primary.main
          }}

        >
          <Tooltip title="Inicio" placement="top">
            <BottomNavigationAction
              color="white"
              showLabel="true"
              icon={
                <Home
                  sx={{
                    width: 24,
                    height: 24,
                    color: 'white',
                  }}
                />
              }
              href={window.location.pathname !== '/' ? '/' : ''}
            />
          </Tooltip>
          <Tooltip title="Sobre Nosotros" placement="top">
          <BottomNavigationAction
            icon={
              <Info
                sx={{
                  width: 22,
                  height: 22,
                  color: 'white',
                }}
              />
            }
            value="about"
          />
          </Tooltip>
          <Tooltip title="Testimonios" placement="top">
          <BottomNavigationAction
            icon={
              <Comment
                sx={{
                  width: 22,
                  height: 22,
                  color: 'white',
                }}
              />
            }
            value="testimonials"
          />
          </Tooltip>
          <Tooltip title="Equipo" placement="top">
          <BottomNavigationAction
            label="Equipo"
            icon={
              <People
                sx={{
                  width: 22,
                  height: 22,
                  color: 'white',
                }}
              />
            }
            value="team"
          />
          </Tooltip>
          
          <Tooltip title="Login" placement="top">
          <a href="/login">
            <BottomNavigationAction
              label="Login"
              icon={
                <Lock
                  sx={{
                    width: 22,
                    height: 22,
                    color: 'white',
                  }}
                />
              }
              value="login"
            />
          </a></Tooltip>
        </BottomNavigation>
        
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          // bgcolor: theme.palette.primary.main,
        }}
        color={location.pathname === '/perfilMedico' ? 'secondary' : 'primary'}
      >
        <Tooltip title="Facebook" placement="top">
        <NavLink to="https://www.facebook.com/profile.php?id=100092882291994" target="_blank">
          <Facebook
            sx={{
              mx: 1,
              color: 'white',
              fontSize: '30px',
              ml: '20px',
              mr: '30px',
            }}
          />
        </NavLink>
        </Tooltip>
        <Tooltip title="Twitter" placement="top">
        <NavLink to="https://www.twitter.com/" target="_blank">
          <Twitter
            sx={{
              mx: 1,
              color: 'white',
              fontSize: '30px',
              ml: '30px',
              mr: '30px',
            }}
          />
        </NavLink>
        </Tooltip>
        <Tooltip title="Instagram" placement="top">
        <NavLink to="https://www.instagram.com/pf.consumedic/" target="_blank">
          <Instagram
            sx={{
              mx: 1,
              color: 'white',
              fontSize: '30px',
              ml: '30px',
              mr: '30px',
            }}
          />
        </NavLink>
        </Tooltip>
      </Box>
      <Box
        sx={{
          p: 2,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" align="center" color="white">
          {`Copyright © ${new Date().getFullYear()}
          Consumedic. Encontrá tu especialista y pedí turno`}
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Footer;
