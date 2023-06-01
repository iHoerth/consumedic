import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { Card, Modal, useTheme } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context/ContextProvider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Stack, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MyDoctors from '../../components/PatientPanel/MyDoctors/MyDoctors';
import MyOpinions from '../../components/PatientPanel/MyOpinions/MyOpinions';
import MyDates from '../../components/PatientPanel/MyDates/MyDates';
import EditProfile from '../../components/PatientPanel/EditProfile/EditProfile';
import Header from '../../components/PatientPanel/Header/Header';

const Admin = () => {
  const theme = useTheme();
  const { vista, setVista } = useContext(Context)[6];
  const { session } = useContext(Context)[2];
  const { fetchPatientByEmail, patientDetail, getOpinionsByPaciente, modifyPatientProfiler } =
    useContext(Context)[1];
  const [dataLoaded, setDataLoaded] = useState(false); // Variable de estado adicional
  const { fetchPatientData } = useContext(Context)[5];
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (patientDetail?.status === 'incomplete') {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }

    const fields = {
      id: patientDetail.id,
      nombre: patientDetail.nombre,
      apellido: patientDetail.apellido,
      dni: patientDetail.dni,
      email: patientDetail.email,
      telefono: patientDetail.telefono,
      ObraSocial: patientDetail.ObraSocial?.nombre || '',
    };

    const newValues = Object.values(fields);
    setValues(newValues);
    const allFieldsCompleted = values && values.every((value) => Boolean(value));
    if (allFieldsCompleted) {
      fields.status = 'active';
      console.log(fields);
      modifyPatientProfiler(fields)
        .then((res) => {
          console.log('MODIFICADO CRACK')
          setModalOpen(false)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  }, [loading, patientDetail?.status]);

  useEffect(() => {
    setLoading(true);
    session.email && fetchPatientByEmail(session.email).then(() => setLoading(false));
  }, [session.email]);

  useEffect(() => {
    fetchPatientByEmail(session.email)
  }, [vista])

  useEffect(() => {
    if (patientDetail.id) {
      setLoading(true);
      fetchPatientData(patientDetail.id);
      getOpinionsByPaciente(patientDetail.id);
      setLoading(false);
      setDataLoaded(true); // Marcar los datos como cargados
    }
  }, [patientDetail.id]);

  const views = ['Mis Doctores', 'Mis Citas', 'Editar Perfil', 'Ver Opiniones'];

  const handleClick = (event) => {
    const index = views.findIndex((el) => el === event.target.innerHTML);
    setVista(index);
  };

  if (loading) {
    return <Loading />;
  }

  const handleClose = () => setModalOpen(false);

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
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <EditProfile status={'incomplete'} modal={modalOpen} handleClose={handleClose} />
        </Box>
      </Modal>
      <NavBar variant="block" />
      <Container maxWidth="sm" sx={{ borderRadius: '5px', display:'flex',
      flexDirection:'column', alignItems:'center', alignContent:'center', backgroundColor: theme.palette.background.main,}}>
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center'
        }}>
          <Header sx={{margin:'20px'}}/>
          <Stack
            
            sx={{
              display: "flex",
              flexDirection: {
                mobile: 'column',
                tablet: 'column',
                laptop: 'column',
                desktop: 'row',
              },
              width: {
                mobile: '90%',
                tablet: '99.5%',
                laptop: '99.5%',
                desktop: '93.5%',
              },
              borderColor: '#bababa',
              borderRadius: '5px',
              
            }}
            // divider={<Divider orientation="vertical" flexItem />}
          >
            <Box
              sx={{
                borderRadius:'5px ',
                display: "flex",
              width: {
                mobile: '90%',
                tablet: '99.5%',
                laptop: '99.5%',
                desktop: '40%',
              },
                // marginTop:'60px',
                margin:'auto',
                  // alignContent:'center',
                  alignItems:'center',
                  justifyContent:'center',
                  
              }}
            >
              <List
                sx={{
                  // width: '100%',
                  // maxWidth: 360,
                  display:'flex',
                  // alignContent:'center',
                  flexWrap:{
                    mobile:"wrap"
                  },
                  alignItems:{
                    mobile:'center',
                  },
                  // justifyContent:'space-beetwen',
                  // margin:'20px',
                  flexDirection: {
                    mobile: 'row',
                    tablet: 'row',
                    laptop: 'row',
                    desktop: 'column',
                  },
                  width: {
                    mobile: '60%',
                    tablet: '99.5%',
                    laptop: '60%',
                    desktop: '100%',
                  },
                  height: {
                    mobile: '20%',
                    tablet: '20%',
                    laptop: '50%',
                    desktop: '80%',
                  },
                  margin: {
                    mobile: '1px',
                    tablet: '10px',
                    laptop: '50px',
                    desktop: '2px',
                  },
                  borderRadius:'5px',
                  // border:'2px solid red',
                  
                  // height:'300px'
                }}
                // component="nav"
                // aria-labelledby="list-subheader"
                // subheader={
                //   <ListItemButton >
                //     <ListItemText
                //       primaryTypographyProps={{
                //         fontSize: '20px',
                //         fontWeight: '500',
                //       }}
                //       sx={{ m: '10px', color: 'white' }}
                //       primary="gasdas"
                //       onClick={handleClick}
                //     />
                //   </ListItemButton>
                // }
              >
                {/* <Divider /> */}
                <ListItemButton sx={{margin:'10px',
                textAlign:'center',
                borderRadius:'5px',
                width: {
                  mobile: '30%',
                  tablet: '60%',
                  laptop: '60%',
                  desktop: values.desktop,
                },
                height: {
                  mobile: '90%',
                  tablet: '99.5%',
                  laptop: '30%',
                  desktop: values.desktop,
                },
                  backgroundColor: theme.palette.primary.main}}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '15px' }}
                    sx={{ m: '0px', color: 'white' }}
                    primary="Mis Doctores"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton sx={{margin:'10px',
                textAlign:'center',
                borderRadius:'5px',
                width: {
                  mobile: '30%',
                  tablet: '60%',
                  laptop: '60%',
                  desktop: values.desktop,
                },
                height: {
                  mobile: '90%',
                  tablet: '99.5%',
                  laptop: '30%',
                  desktop: values.desktop,
                },
                  backgroundColor: theme.palette.primary.main}}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '15px' }}
                    sx={{ m: '0px', color: 'white' }}
                    primary="Mis Citas"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton sx={{margin:'10px',
                textAlign:'center',
                borderRadius:'5px',
                width: {
                  mobile: '30%',
                  tablet: '60%',
                  laptop: '60%',
                  desktop: values.desktop,
                },
                height: {
                  mobile: '90%',
                  tablet: '99.5%',
                  laptop: '30%',
                  desktop: values.desktop,
                },
                  backgroundColor: theme.palette.primary.main}}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '15px' }}
                    sx={{ m: '0px', color: 'white' }}
                    primary="Editar Perfil"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton sx={{margin:'10px',
                textAlign:'center',
                borderRadius:'5px',
                width: {
                  mobile: '30%',
                  tablet: '60%',
                  laptop: '60%',
                  desktop: values.desktop,
                },
                height: {
                  mobile: '90%',
                  tablet: '99.5%',
                  laptop: '30%',
                  desktop: values.desktop,
                },
                  backgroundColor: theme.palette.primary.main,}}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '15px' }}
                    sx={{ m: '0px', color: 'white' }}
                    primary="Ver Opiniones"
                    onClick={handleClick}
                  />
                </ListItemButton>

              </List>
            </Box>
            <Box
              sx={{
                height: '100%',
                m: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'top',
                // alignItems: 'left',
              }}
            >
              {loading ? (
                <Loading />
              ) : (
                <>
                  {/* ACA VAN LOS  COMPONENTES QUE SE RENDERIZAN A LA IZQ DE LA LISTA */}
                  {vista === 0 ? (
                    <MyDoctors />
                  ) : vista === 1 ? (
                    <MyDates />
                  ) : vista === 2 ? (
                    <EditProfile />
                  ) : vista === 3 ? (
                    <MyOpinions />
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

export default Admin;
