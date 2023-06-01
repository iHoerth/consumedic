import { useState, useEffect } from 'react';
import { Typography, Link, Box, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { NavLink } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

const preventDefault = (event) => event.preventDefault();

const Footer = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState('home');
  const location = useLocation();
  const doctorDashboard = location.pathname !== '/perfilMedico';

  useEffect(() => {
    setCurrentPage(location.pathname === '/' ? 'home' : '');
  }, [location]);

  const handleNavigation = (event, page) => {
    let newHeight = 0;
    switch (page) {
      case 'home':
        newHeight = 0;
        break;
      case 'about':
        newHeight = theme.heights.homeSection * 1;
        break;
      case 'team':
        newHeight = theme.heights.homeSection * 1.5;
        break;
    }
    const scrollTo = newHeight; // Valor de desplazamiento personalizado (en este caso, 40% de la altura de la ventana)
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <footer
    style={{
      backgroundColor: theme.palette.primary.main,
      paddingTop: '35px',
      marginTop: 'auto',
      textAlign: 'center',
      padding: '10px',
      scrollBehavior: 'smooth', // Hace que el scrolling sea más suave y lento
    }}
    >
      <Box display="flex" justifyContent="center" mt={2}>
        <Link
          value={currentPage}
          onChange={handleNavigation}
         
          color="inherit"
          variant="body2"
          sx={{
            pl: '40px',
            pr: '40px',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'white',
          }}
          onClick={handleNavigation}
        >
          INICIO
        </Link>
        <Link
          value="about"
          color="inherit"
          variant="body2"
          sx={{
            pl: '40px',
            pr: '40px',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'white',
          }}
          onClick={(event) => handleNavigation(event, 'about')}
        >
          SOBRE NOSOTROS
        </Link>
        <Link
          href="/login"
          color="inherit"
          variant="body2"
          sx={{
            pl: '40px',
            pr: '40px',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'white',
          }}
          onChange={handleNavigation}
        >
          LOGIN
        </Link>
        <Link
          value="team"
          variant="body2"
          sx={{
            pl: '40px',
            pr: '40px',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'white',
          }}
          onClick={(event) => handleNavigation(event, 'team')}
        >
          EQUIPO
        </Link>
      </Box>
      <Box display="flex" width="100%" justifyContent="center" mt={2}>
      <Divider style={{ width: '25%', marginTop: '10px' }} />
      </Box>

      <Box display="flex" width="100%" justifyContent="center" mt={2}>
        <Typography
          variant="body2"
          align="center"
          style={{ width: '25%', color: 'white' }}
        >
          Nuestro objetivo es brindar un servicio eficiente y conveniente para agendar turnos médicos en línea. En nuestra plataforma, puedes encontrar y reservar citas con profesionales de la salud en diversos campos, ofreciéndote comodidad y flexibilidad en la gestión de tu atención médica.
        </Typography>
      </Box>

      <Box display="flex" width="100%" justifyContent="center" mt={2}>
        <Divider style={{ width: '25%', marginTop: '10px' }} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="10px"
      >
        <NavLink to="https://www.facebook.com/profile.php?id=100092882291994" target="_blank">
          <FacebookIcon sx={{ color: 'white', margin: '10px' }} />
        </NavLink>

        <NavLink to="https://www.twitter.com/" target="_blank">
          <TwitterIcon sx={{ color: 'white', margin: '10px' }} />
        </NavLink>

        <NavLink to="https://www.instagram.com/pf.consumedic/" target="_blank">
          <InstagramIcon sx={{ color: 'white', margin: '10px' }} />
        </NavLink>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body2" color="White" align="center" padding="10px">
          &copy; {new Date().getFullYear()} Consumedic. Encontrá tu especialista y pedí turno
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
