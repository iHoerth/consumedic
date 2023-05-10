import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Button } from '@mui/material';

import SearchBar from '../../components/SearchBar/SearchBar'

import style from './Landing.module.css';

const Landing = () => {
  return (
    <>
      <NavBar />
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
