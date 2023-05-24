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

const preventDefault = (event) => event.preventDefault();

const Footer = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const theme = useTheme();

  const handleNavigation = (event, page) => {
    let newHeight = 0;
    console.log(page);
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
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          p: 1,
          width: '100%',
          bgcolor: theme.palette.primary.main,
        }}
      >
        <BottomNavigation
          value={currentPage}
          onChange={handleNavigation}
          sx={{
            bgcolor: theme.palette.primary.main,
          }}
        >
          <BottomNavigationAction
            label="Incio"
            color='white'
            showLabel='true'
            icon={
              <Home
                sx={{
                  width: 24,
                  height: 24,
                  color: 'white',
                }}
              />
            }
            value="home"
            href={window.location.pathname !== '/' ? '/' : ''}
          />
          <BottomNavigationAction
            label="Sobre Nosotros"
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
          <BottomNavigationAction
            label="Testimonios"
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
          </a>
        </BottomNavigation>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          bgcolor: theme.palette.primary.main,
        }}
      >
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
    </Box>
  );
};

export default Footer;
