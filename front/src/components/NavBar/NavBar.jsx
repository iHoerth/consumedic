import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';

const NavBar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={style.NavBar}>
      <div style={{ fontSize: '24px', fontWeight: '500' }} className={style.title}>
        Consumedic
      </div>
      <div className={style.navButtonsContainer}>
        {isMatch ? (
          <IconButton>
            <MenuIcon></MenuIcon>
          </IconButton>
        ) : (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? style.navActive : style.navInactive)}
              to="/home"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? style.navActive : style.navInactive)}
              to="/login"
            >
              Log In
            </NavLink>{' '}
            <NavLink
              className={({ isActive }) => (isActive ? style.navActive : style.navInactive)}
              to="/login"
            >
              Eres un medico?
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
