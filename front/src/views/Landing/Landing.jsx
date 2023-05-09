import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import NavBarMui from '../../components/NavBar/NavBarMUI';
import { Button } from '@mui/material';
import style from './Landing.module.css';

const Landing = () => {
  return (
    <>
      <NavBar />
      {/* <NavBarMui /> */}
      <div className={style.container}>
        <div>BANNER CON IMAGEN DE MEDICO</div>
        <div className={style.buttonContainer}>
          <Button variant="contained" sx={{ width: '200px' }}>
            BUSCAR MEDICOS
          </Button>
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
