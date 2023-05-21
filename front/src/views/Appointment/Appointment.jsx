import React, { useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography, Container } from '@mui/material';
import NavBar from '../../components/NavBar/NavBar';
import Loading from '../../components/Loading/Loading';

import Reserva from '../../components/AppointmentViews/Reserva';
import Aceptado from '../../components/AppointmentViews/Aceptado';
import Rechazado from '../../components/AppointmentViews/Rechazado';

import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import create31 from '../../assets/Img/create31.jpg';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
initMercadoPago('TEST-9e5c4674-d7f9-42bc-9f39-62fe105ad00c');
// require('dotenv').config();



const Appointment = () => {

  const [vista,setVista]=useState("Loading")
  const params = useParams()
  console.log(params);
  const {id, fecha, hora, estado} = useParams()
  console.log(id, fecha, hora, estado);

  useEffect(() => {
    console.log(params);
    if(estado === "reserva" ){
      setVista("Reserva")
    }
    else if(estado==="aprobado"){
      setVista("Aprobado")
    }
    else if(estado==="rechazado"){
      setVista("Rechazado")
    }
    else {
      setVista("Loading")
    }
  }, [estado]);


  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{
          backgroundImage: `url('${create31}')`,
          backgroundPosition: 'center',
          // backgroundPositionY: "10%",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: "fixed",
          position: 'relative',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifycontent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        
          {vista === "Loading" ? <Loading/> : ( vista === "Reserva" ? <Reserva /> : (vista==="Aprobado"? <Aceptado/>:( vista==="Rechazado" ? <Rechazado /> : null) ))}
      </Box>
      <Footer />
    </>
  );
};

export default Appointment;
