import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={style.NavBar}>
      <div style={{fontSize:'24px',fontWeight:'500'}} className={style.navInactive}>Consumedic</div>
      <div className={style.navButtonsContainer}>
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
        </NavLink>        <NavLink
          className={({ isActive }) => (isActive ? style.navActive : style.navInactive)}
          to="/login"
        >
          Eres un medico?
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
