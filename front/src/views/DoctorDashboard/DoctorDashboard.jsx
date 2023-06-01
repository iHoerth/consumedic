import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import ConfigAgenda from '../../components/DoctorDashboard/ConfigAgenda';
import Profile from '../../components/DoctorDashboard/Profile';
import Pacientes from '../../components/DoctorDashboard/Pacientes';
import { Button, Card, Modal, Typography, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context/ContextProvider';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Stack, Divider, Snackbar, Alert, AlertTitle } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HistorialPaciente from '../../components/DoctorDashboard/HistorialPaciente';
import Turnos from '../../components/DoctorDashboard/Turnos';
import EditarPerfil from '../../components/DoctorDashboard/EditarPerfil';

const DoctorDashboard = () => {
  const theme = useTheme();
  const { session } = useContext(Context)[2];
  const { turnos, fetchTurnos, fetchPacientes } = useContext(Context)[3];
  const { pacienteHistorial, pacientes } = useContext(Context)[3];
  const { fetchDoctorByEmail, doctorDetail, putDoctor } = useContext(Context)[0];
  const { snackOk, snackOkMensaje, setSnackOk, setSnackOkMensaje } = useContext(Context)[0];
  const {
    id,
    nombre,
    Descripcion,
    apellido,
    direccion,
    dni,
    email,
    imagen,
    precio,
    telefono,
    titulo,
    Especialidads,
    ObraSocials,
  } = doctorDetail;
  const { vista, setVista } = useContext(Context)[3];
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    if (doctorDetail.status === 'incomplete' && vista !== 1) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [doctorDetail, vista]);

  useEffect(() => {
    setLoading(true);
    session.email &&
      fetchDoctorByEmail(session.email).then(() => {
        setLoading(false);
        if (doctorDetail.status === 'incomplete') {
          setModalOpen(true);
        } else {
          setModalOpen(false);
        }
      });
  }, []);

  useEffect(() => {
    if (session.email && !doctorDetail?.email) {
      const search = async () => {
        await fetchDoctorByEmail(session.email);
      };
      search();
      // console.log(doctorDetail);
    } else {
      setLoading(false);
      fetchTurnos(doctorDetail.id);
      fetchPacientes(doctorDetail.id);
    }
    // console.log(loading);
  }, [loading, doctorDetail]);
  // console.log(doctorDetail);
  const views = [
    'Mi Perfil',
    'Editar Perfil',
    'Ver Mis Turnos',
    'Configurar Agenda',
    'Administrar Agenda',
    'Ver Opiniones',
    'Mis Pacientes',
    'Gestionar Cuenta',
  ];
  const handleClick = (event) => {
    const index = views.findIndex((el) => el === event.target.innerHTML);
    console.log(event.target.innerHTML);
    // console.log(index);
    setVista(index);
  };

  return (
    <>
      <Modal open={modalOpen}>
        <Box
          sx={{
            position: 'absolute',
            width: '60%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          {/* <EditarPerfil
            status={'incomplete'}
            modal={modalOpen}
            handleModalClose={handleModalClose}
          /> */}
          <Typography>DEBES COMPLETAR TODOS TUS DATOS PARA EXHIBIR TU PERFIL.</Typography>
          <Button
            onClick={() => {
              setVista(1);
              handleModalClose();
            }}
            name="obrasSociales"
            color="secondary"
            variant="contained"
            sx={{ ml: '10px' }}
            size="small"
            startIcon={<EditIcon />}
          >
            EDITAR PERFIL
          </Button>
        </Box>
      </Modal>
      <NavBar />
      <Snackbar
        open={snackOk}
        autoHideDuration={1500}
        onClose={() => {
          setSnackOk(false);
          setSnackOkMensaje('');
        }}
      >
        <Alert severity="success" variant="filled">
          <AlertTitle>Mensaje Exitoso</AlertTitle>
          {snackOkMensaje}
        </Alert>
      </Snackbar>
      <Container maxWidth="sm" sx={{ mt: '110px', mb: '40px' }}>
        <Box sx={{ height: '85vh' }}>
          <Stack
            direction="row"
            sx={{
              border: '1px solid',
              borderColor: '#bababa',
              borderRadius: '10px',
              backgroundColor: theme.palette.background.main,
            }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box
              sx={{
                height: '88vh',
                width: '150px',
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '10px 0px 0px 10px',
              }}
            >
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: '10px 0px 0px 0px',
                }}
                component="nav"
                aria-labelledby="list-subheader"
                subheader={
                  <ListItemButton>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '20px',
                        fontWeight: '500',
                      }}
                      sx={{ m: '0px' }}
                      primary="Mi Perfil"
                      onClick={handleClick}
                    />
                  </ListItemButton>
                }
              >
                <Divider />
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '15px' }}
                    sx={{ m: '0px' }}
                    primary="Editar Perfil"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '15px' }}
                    sx={{ m: '0px' }}
                    primary="Ver Mis Turnos"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '15px' }}
                    sx={{ m: '0px' }}
                    primary="Configurar Agenda"
                    onClick={handleClick}
                  />
                </ListItemButton>
                {/* <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Administrar Agenda"
                    onClick={handleClick}
                  />
                </ListItemButton> */}
                {/* <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Ver Opiniones"
                    onClick={handleClick}
                  />
                </ListItemButton> */}
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '15px' }}
                    sx={{ m: '0px' }}
                    primary="Mis Pacientes"
                    onClick={handleClick}
                  />
                </ListItemButton>
                {/* <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Gestionar Cuenta"
                    onClick={handleClick}
                  />
                </ListItemButton> */}
                <Divider />
              </List>
            </Box>
            <Box
              sx={{
                height: '85vh',
                width: '90vw',
                m: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'top',
                alignItems: 'left',
              }}
            >
              {loading ? (
                <Loading />
              ) : (
                <>
                  {/* ACA VAN LOS  COMPONENTES QUE SE RENDERIZAN A LA DERECHA DE LA LISTA */}
                  {vista === 0 ? (
                    <Profile doctorDetail={doctorDetail} />
                  ) : vista === 3 ? (
                    <ConfigAgenda doctorDetail={doctorDetail} />
                  ) : vista === 6 ? (
                    <Pacientes id={doctorDetail?.id} />
                  ) : vista === 2 ? (
                    <Turnos id={doctorDetail?.id} />
                  ) : vista === 10 ? (
                    <HistorialPaciente id={doctorDetail?.id} />
                  ) : vista === 1 ? (
                    <EditarPerfil doctorDetail1={doctorDetail} />
                  ) : null}
                </>
              )}
            </Box>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default DoctorDashboard;
