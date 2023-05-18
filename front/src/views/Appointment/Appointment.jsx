import React, {useContext} from 'react';
import { Context } from '../../context/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import create31 from "../../assets/Img/create31.jpg";
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
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-9e5c4674-d7f9-42bc-9f39-62fe105ad00c');



const Appointment = () => {
  const { id, fecha, hora } = useParams(); // viene de parametros
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  let yy = fecha.split("-")[0]
  let mm = meses[Number(fecha.split("-")[1]) - 1]
  let dd = fecha.split("-")[2]
  let hh = hora.split(":")[0]
  let min = hora.split(":")[1]
  let datosTurno = `${dd} ${mm} ${yy}, ${hh}:${min} hs`
  const [doctor, setDoctor] = useState({})

  const navigate = useNavigate()
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/doctors/${id}`)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [form, setForm] = useState({
    motivo: "",
  });

  const [error, setError] = useState({
    motivo: "",
  });

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
    if (!form.motivo) {
      errors.motivo = "El campo de motivo es requerido";
    }
    setError(errors);
    return Object.keys(errors).length === 0
  }
  

  const dataDoctors = useContext(Context)[0];
  const {doctorDetail} = dataDoctors;
  const dataPreferences = {
    doctorName: doctorDetail.nombre,
    doctorApellido: doctorDetail.apellido,
    precioConsulta: doctorDetail.precio,
    doctorEmail: doctorDetail.email,
    doctorDireccion: doctorDetail.direccion,
    doctorId: doctorDetail.id
  }


  
  function handleClickMp() {
    axios.post('http://localhost:3001/turno', dataPreferences)
      .then((res) => {
        console.log(res);
        window.location.href = res.data.global;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  

  const [preferences, setPreferences] = useState([]);


    // useEffect(()=>{
  //   console.log(dataPreferences);
  // })


  // useEffect(() => {
  //   axios.get('/generar')
  //     .then(response => {
  //       setPreferences(response.data);
  //     })
  //     .catch(error => console.error(error));
  // }, []);


  // const pagarConsulta = async (req, res) => {
  //   const idDoctor = req.params.id;

  //   const cita = await Cita.findByPk ()
  //   //defino las preferencias
  //   let preferences = {
  //     transaction_amount: parseInt()
  //   }
  // }

  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{
          backgroundImage: `url('${create31}')`,
          backgroundPosition: "center",
          // backgroundPositionY: "10%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifycontent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Container
          component={Paper}
          elevation={5}
          sx={{
            display: "flex",
            justifycontent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "fit-content",
            padding: "10px",
            marginTop: "12%",
            marginBottom: "10%",
          }}
        >
          <Box>
            <Typography variant="h5" component="div" color='black'>
              Datos relativos a la cita
            </Typography>
            <Box>
              <Typography component="div" color='black' sx={{ mt: "20px", mb: "5px" }}>
                Motivo de la consulta
              </Typography>
              <TextField
                id="motivo"
                label="Escriba un comentario con el motivo de la consulta"
                color="secondary"
                value={form.motivo}
                name="motivo"
                onChange={(event) => handleInputChange(event)}
                sx={{ height: "100px", width: "500px" }}
                helperText={
                  error.motivo ? (
                    <Typography color="error">{error.motivo}</Typography>
                  ) : (
                    ""
                  )
                }
                required
              />
            </Box>
            <Button
              variant="contained"
              disabled={error.motivo}
              onClick={handleClickMp}
            >
              Proceder al Pago</Button>

           
            <Typography sx={{ fontSize: "10px", mt: "5px" }}>una vez efectuado el pago se agendará la consulta</Typography>
          </Box>
          <Box>
            <List
              subheader={
                <ListSubheader component="div" sx={{ mt: "15px" }}>
                  Datos del Médico
                </ListSubheader>
              }
            >
              <ListItem alignItems="flex-start" sx={{ pt: "0px" }}>
                <ListItemAvatar sx={{ mt: "0px" }}>
                  <Avatar alt="Img Doctor" src={doctor ? doctor.imagen : null} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ mt: "0px" }}
                  primary={doctor ? `${doctor.nombre} ${doctor.apellido}` : null}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {doctor.Especialidads ? doctor.Especialidads.map(espe => `${espe.name} `) : null}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText
                  primary={datosTurno}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={doctor ? doctor.precio : null}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary={doctor ? doctor.direccion : null}
                />
              </ListItem>
            </List>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Appointment;


