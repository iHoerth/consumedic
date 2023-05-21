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



const Aceptado = (idPaciente) => {
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
  const { postAppointment } = useContext(Context)[1];
  
  const datos = {
    fecha: fecha,
    hora: hora,
    descripcion: comentario,
    idDoctor: id,
    idPatient: idPaciente
  }

  useEffect(() => {
    fetchDoctorById(id);
    postAppointment(datos);
  }, []);

  const handleClick = ()=>{
    navigate("/patientpanel/");
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
            <Typography variant="h5" component="div" color="black" sx={{mb:"10px"}}>
              Pago Aceptado!
            </Typography>
            <Typography variant="h6" component="div" color="black" sx={{width:"400px"}}>
              Su Cita ha sido Programada
            </Typography>
            <Typography component="div" color="black" sx={{width:"400px", fontSize:"15px"}}>
              Recibira un correo electronico con la confirmacion
            </Typography>
            <Typography component="div" color="black" sx={{ mt: '15px', mb: '5px', fontSize: "20px"}}>
            {`Motivo de la consulta: `}
            </Typography>
            <Box sx={{border:"1px solid lightgrey", borderRadius:"5px", mb:"10px", height:"70px"}}>
              <Typography component="div" color="black" sx={{ mt: '5px', ml:"5px", mb: '15px', fontSize:"15px" }}>
                {`${comentario}`}
              </Typography>
            </Box>
            <Button variant="contained"  onClick={handleClick}>
              Ir a Mi Cuenta
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

export default Aceptado;
