import React from 'react';
import NavBarMui from '../../components/NavBar/NavBarMUI';
import { Button } from '@mui/material';

import SearchBar from '../../components/SearchBar/SearchBar'

import style from './Landing.module.css';

const Landing = () => {
  return (
    <>
      <NavBarMui />
      <div className={style.container}>
        <div>BANNER CON IMAGEN DE MEDICO</div>
        <div className={style.buttonContainer}>
          <SearchBar></SearchBar>
          <Button variant="contained" sx={{ width: '200px' }}>
            INGRESO COMO MEDICO
          </Button>
        </div>
        <div>BANNER CON IMAGEN DE MEDICO</div>
      </div>
    </>
  );
};

export default Landing;
