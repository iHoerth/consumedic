import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Button } from '@mui/material';
import ImageHome from '../../components/ImageHome/ImageHome';

import SearchBar from '../../components/SearchBar/SearchBar'

import style from './Landing.module.css';

const Landing = () => {
  return (
    <>
      <NavBar />
      <div className={style.container}>
        <ImageHome />
        <div className={style.buttonContainer}>
          <Button href='/home' variant="contained" sx={{ width: '200px' }}>
            BUSCAR MEDICOS YA! NO AGUANTO MAS!!!
          </Button>
        </div>
        <div>BANNER CON IMAGEN DE MEDICO</div>
      </div>
    </>
  );
};

export default Landing;
