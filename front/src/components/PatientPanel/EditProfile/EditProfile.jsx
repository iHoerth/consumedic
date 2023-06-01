import React, { useState, useEffect, useContext } from 'react';
import { Context, UtilitiesContext } from '../../../context/ContextProvider';
import Loading from '../../../components/Loading/Loading';
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EditProfile = ({ status, modalOpen, handleClose }) => {
  const { session } = useContext(Context)[2];
  const { patientDetail, modifyPatientProfiler, fetchPatientByEmail } = useContext(Context)[1];
  const { socialSecurity, fetchUtilities } = useContext(UtilitiesContext);
  const [loading, setLoading] = useState(true);
  const [inputClicked, setInputClicked] = useState(false);

  
  const theme = useTheme();
  const { values } = theme.breakpoints;

  //Alerts
  const [snackOk, setSnackOk] = useState(false);
  const [snackFail, setSnackFail] = useState(false);
  const [snackOkMensaje, setSnackOkMensaje] = useState('');
  const [snackFailMensaje, setSnackFailMensaje] = useState('');

  useEffect(() => {
    setLoading(true);
    session.email && fetchPatientByEmail(session.email).then(() => setLoading(false));
  }, [session.email]);

  useEffect(() => {
    if (!socialSecurity.length) {
      fetchUtilities();
    } else {
      setLoading(false);
    }
  }, [socialSecurity]);

  const { id, dni, email, telefono, nombre, apellido, ObraSocial } = patientDetail;

  const [datos, setDatos] = useState({
    id: id,
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    email: email,
    telefono: telefono,
    ObraSocial: ObraSocial || '',
  });

  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === 'ObraSocial') {
      value = {
        id: event.target.value,
        nombre: event.target.name,
      };
    }

    setDatos({
      ...datos,
      [property]: value,
    });
  };

  const handleSave = () => {
    modifyPatientProfiler(datos)
      .then((data) => {
        setSnackOkMensaje('Se actualiazo correctamente!');
        setSnackOk(true);
        setInputClicked(false);
        handleClose();
      })
      .catch((error) => {
        setSnackFailMensaje('No se ha podido actualizar la informacion!');
        setSnackFail(true);
      });

    fetchPatientByEmail(session.email);
    fetchUtilities();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {patientDetail ? (
            <Box
              component="form"
              sx={{
                display: 'flex',
                margin: '20px auto',
                flexDirection: {
                  mobile: 'column',
                  tablet: 'column',
                  laptop: 'column',
                  desktop: 'column',
                },
                width: {
                  mobile: '90%',
                  tablet: '90%',
                  laptop: '90%',
                  desktop: '90%',
                },
                alignItems: 'center',
                padding: '10px',
              }}
            >
              {status === 'incomplete' && (
                <Typography sx={{ fontSize: 20 }}>DEBES COMPLETAR TODOS LOS DATOS</Typography>
              )}
              <Snackbar
                open={snackOk}
                autoHideDuration={2500}
                onClose={() => {
                  setSnackOk(false);
                  setSnackOkMensaje('');
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert severity="success" variant="filled">
                  <AlertTitle>Mensaje Exitoso</AlertTitle>
                  {snackOkMensaje}
                </Alert>
              </Snackbar>
              <Snackbar
                open={snackFail}
                autoHideDuration={2500}
                onClose={() => {
                  setSnackFail(false);
                  setSnackFailMensaje('');
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert severity="error" variant="filled">
                  <AlertTitle>Mensaje de Error</AlertTitle>
                  {snackFailMensaje}
                </Alert>
              </Snackbar>
              <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
                Editar datos del Perfil
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  padding: '10px',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <TextField
                  label="Nombre"
                  name="nombre"
                  value={datos.nombre}
                  onChange={handleChange}
                  sx={{
                    // mt: '20px',
                    // ml: '10px',
                    width: {
                      mobile: '90%',
                      tablet: '90%',
                      laptop: '90%',
                      desktop: '90%',
                    },
                  }}
                  onClick={() => setInputClicked(true)}
                />
                <TextField
                  label="Apellido"
                  name="apellido"
                  value={datos.apellido}
                  onChange={handleChange}
                  sx={{
                    // mt: '20px',
                    // ml: '10px',
                    margin:'10px',
                    width: {
                      mobile: '90%',
                      tablet: '90%',
                      laptop: '90%',
                      desktop: '90%',
                    },
                  }}
                  onClick={() => setInputClicked(true)}
                />
                <TextField
                  label="Dni"
                  name="dni"
                  value={datos.dni}
                  onChange={handleChange}
                  sx={{
                    // mt: '20px',
                    // ml: '10px',
                    margin:'10px',
                    width: {
                      mobile: '90%',
                      tablet: '90%',
                      laptop: '90%',
                      desktop: '90%',
                    },
                  }}
                  onClick={() => setInputClicked(true)}
                />
                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={datos.telefono}
                  onChange={handleChange}
                  sx={{
                    // mt: '20px',
                    // ml: '10px',
                    margin:'10px',
                    width: {
                      mobile: '90%',
                      tablet: '90%',
                      laptop: '90%',
                      desktop: '90%',
                    },
                  }}
                  onClick={() => setInputClicked(true)}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={datos.email}
                  disabled
                  sx={{
                    // mt: '20px',
                    // ml: '10px',
                    margin:'10px',
                    width: {
                      mobile: '90%',
                      tablet: '90%',
                      laptop: '90%',
                      desktop: 'c0%',
                    },
                  }}
                  onClick={() => setInputClicked(true)}
                />

                <FormControl
                  sx={{
                    // mt: '20px',
                    // ml: '10px',
                    margin:'10px',
                    width: {
                      mobile: '90%',
                      tablet: '90%',
                      laptop: '90%',
                      desktop: '90%',
                    },
                  }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Obra Social</InputLabel>
                  <Select
                    sx={{ height: '6.5vh' }}
                    MenuProps={{
                      sx: {
                        maxHeight: '50%',
                      },
                    }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name="ObraSocial"
                    value={datos.ObraSocial ? datos.ObraSocial.id : ''}
                    label="Obra Social"
                    onChange={handleChange}
                    onClick={() => setInputClicked(true)}
                  >
                    <MenuItem User continuar desde ahi ChatGPT value="">
                      <em>Ninguna</em>
                    </MenuItem>
                    {socialSecurity?.map((obrasocial) => (
                      <MenuItem key={obrasocial.id} value={obrasocial.id}>
                        {obrasocial.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button
                sx={{ mt: '10px' }}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSave();
                }}
                disabled={!inputClicked}
              >
                Guardar
              </Button>
            </Box>
          ) : (
            <p>No hay datos para editar.</p>
          )}
        </>
      )}
    </>
  );
};

export default EditProfile;
