import { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
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

const URL_TURNOS = process.env.REACT_APP_URL_TURNOS;

const Reserva = () => {
  const [form, setForm] = useState({
    motivo: '',
  });

  const [error, setError] = useState({
    motivo: '',
  });
  const { id, fecha, hora } = useParams(); // viene de parametros
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
  const { patientDetail } = useContext(Context)[1];


  const dataPreferences = {
    doctorName: doctorDetail.nombre,
    doctorApellido: doctorDetail.apellido,
    precioConsulta: doctorDetail.precio,
    doctorEmail: doctorDetail.email,
    doctorDireccion: doctorDetail.direccion,
    doctorId: doctorDetail.id,
    fechaCita: fecha,
    horaCita: hora,
    idDoctor: id,
    comentario: form.motivo,
    pacienteId: patientDetail.id

  };
  useEffect(() => {
    fetchDoctorById(id);
  }, []);

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
    validateForm({ ...form, [property]: value });
  };

  function validateForm(form) {
    const errors = {};
    if (form.motivo === '') {
      errors.motivo = 'El campo de motivo es requerido';
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  }

  function handleClickMp() {
    console.log(URL_TURNOS);
    axios
      .post(URL_TURNOS, dataPreferences)
      .then((res) => {
        console.log(res);
        window.location.href = res.data.global;
      })
      .catch((err) => {
        console.log(err.message);
      });
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
          flexDirection: {
            mobile: 'column',
            tablet: 'column',
            laptop: 'row',
            desktop: 'row',
          },
          width: {
            mobile: '90%',
            tablet: '90%',
            laptop: '70%',
            desktop: '90%',
          },
          padding: '10px',
          margin: {
            mobile: 'auto',
            tablet: 'auto',
            laptop: 'auto',
            desktop: 'auto',
          }
        }}
      >
        <Box sx={{ flex: 1, width: '100%', textAlign: 'center' }}
        >
          <Typography variant="h5" component="div" color="black">
            Datos relativos a la cita
          </Typography>
          <Box>
            <Typography component="div" color="black" sx={{ mt: '20px', mb: '5px' }}>
              Motivo de la consulta
            </Typography>
            <TextField
              id="motivo"
              label="Escriba un comentario con el motivo de la consulta"
              color="primary"
              value={form.motivo}
              name="motivo"
              onChange={(event) => handleInputChange(event)}
              sx={{
                margin:'10px',
                width: {
                  mobile: '80%',
                  tablet: '80%',
                  laptop: '80%',
                  desktop: '80%',
                },
              }}
              helperText={error.motivo ? <Typography color="error">{error.motivo}</Typography> : ''}
              required
            />
          </Box>
          <Button
            variant="contained"
            disabled={form.motivo === '' ? true : false}
            onClick={handleClickMp}
          >
            Proceder al Pago
          </Button>

          <Typography sx={{ fontSize: '10px', mt: '5px' }}>
            Una vez efectuado el pago se agendará la consulta
          </Typography>
        </Box>
        <Box sx={{ flex: 1, width: '100%' }}>
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

export default Reserva;
