import React, { useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Paper} from '@mui/material';

import axios from 'axios';

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



const Rechazado = () => {
    const navigate = useNavigate()
    
  const { id, fecha, hora, comentario } = useParams(); 
  const meses = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  let yy = fecha.split('-')[0];
  let mm = meses[Number(fecha.split('-')[1]) - 1];
  let dd = fecha.split('-')[2];
  let hh = hora.split(':')[0];
  let min = hora.split(':')[1];
  let datosTurno = `${dd} ${mm} ${yy}, ${hh}:${min} hs`;

  const { doctorDetail, fetchDoctorById } = useContext(Context)[0];

  useEffect(() => {
    fetchDoctorById(id);
  }, []);

  const handleClick = ()=>{
    navigate(`/turno/${id}/${fecha}/${hora}/reserva/0`);
  }

  return (
    <>
        <Container
          component={Paper}
          elevation={5}
          sx={{
            display: 'flex',
            justifycontent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: 'fit-content',
            padding: '10px',
            marginTop: '12%',
            marginBottom: '10%',
          }}
        >
          <Box>
            <Typography variant="h5" component="div" color="black" sx={{mb:"30px"}}>
              Su pago ha sido Rechazado
            </Typography>
            <Typography variant="h6" component="div" color="black" sx={{width:"400px", mb:"60px"}}>
              Intente nuevamente reservar el turno
            </Typography>
            <Button variant="contained"  onClick={handleClick}>
              Reservar Nuevamente
            </Button>
          </Box>
          <Box>
            <List
              subheader={
                <ListSubheader component="div" sx={{ mt: '15px' }}>
                  Datos del Médico
                </ListSubheader>
              }
            >
              <ListItem alignItems="flex-start" sx={{ pt: '0px' }}>
                <ListItemAvatar sx={{ mt: '0px' }}>
                  <Avatar alt="Img Doctor" src={doctorDetail ? doctorDetail.imagen : null} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ mt: '0px' }}
                  primary={doctorDetail ? `${doctorDetail.nombre} ${doctorDetail.apellido}` : null}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {doctorDetail.Especialidads
                        ? doctorDetail.Especialidads.map((espe) => `${espe.name} `)
                        : null}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary={datosTurno} />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={doctorDetail ? doctorDetail.precio : null} />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={doctorDetail ? doctorDetail.direccion : null} />
              </ListItem>
            </List>
          </Box>
          </Container>
    </>
  );
};

export default Rechazado;
