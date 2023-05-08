import { NavLink } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = ({ setPageValue }) => {

  return (
    <div className={style.NavBar}>
      <NavLink
        className={({ isActive }) => (isActive ? style.navActive : style.navInactive)}
        to="/home"
      >
        Home
      </NavLink>
      <SearchBar setPageValue={setPageValue} />
      <NavLink
        className={({ isActive }) => (isActive ? style.navActive : style.navInactive)}
        to="/login"
      >
        Log In
      </NavLink>
    </div>
  );
};

export default NavBar;
