import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import {
  Container,
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  imageListClasses,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/ContextProvider';
import { useContext } from 'react';

import logindoc24 from '../../assets/Img/logindoc24.jpg';

const LoginDoctor = () => {
  const navigate = useNavigate();
  const { doctorDetail, loginDoctor } = useContext(Context)[0];
  const { snackOk, snackOkMensaje, setSnackOk, setSnackOkMensaje } = useContext(Context)[0];
  const { snackFail, snackFailMensaje, setSnackFail, setSnackFailMensaje } = useContext(Context)[0];

  const clientID = '508619813355-m14kuspv71hdsu4s1u8bsl421a999cf8.apps.googleusercontent.com';

  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  //estados de email y contraseña
  const [localEmail, setLocalEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  //estados de password
  const [localPassword, setLocalPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');

  //expresion regular para mails
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load('client:auth2', start);
  }, []);

  //funcion para validar email
  const handleLocalEmailChange = (event) => {
    setLocalEmail(event.target.value);

    // Validar el correo electrónico
    if (event.target.value === '') {
      setEmailError(true);
      setEmailHelperText('El correo electrónico es requerido.');
    } else if (!emailRegex.test(event.target.value)) {
      setEmailError(true);
      setEmailHelperText('El correo electrónico no es válido.');
    } else {
      setEmailError(false);
      setEmailHelperText('');
    }
  };

  // funcion para validar contrasena
  const handleLocalPasswordChange = (event) => {
    setLocalPassword(event.target.value);
    if (event.target.value === '') {
      setPasswordError(true);
      setPasswordHelperText('ingrese su contrasena.');
    } else {
      setPasswordError(false);
      setPasswordHelperText('');
    }
  };

  //submit
  function handleLocalSubmit(event) {
    event.preventDefault();
    loginDoctor({ email: localEmail, password: localPassword })
      .then((res) => {
        console.log(res);
        setSnackOk(true);
        setSnackOkMensaje('Logueado con exito');
        navigate('/perfilMedico');
      })
      .catch((err) => {
        setSnackFail(true);
        setSnackFailMensaje(err.response.data.message);
      });
  }

  const onSuccess = (response) => {
    console.log(response);
    setUser(response.profileObj);
    loginDoctor({
      loggedFromGoogle: true,
      email: response.profileObj.email,
      token: response.tokenId,
      nombre: response.profileObj.givenName,
      apellido: response.profileObj.familyName,
    })
      .then((res) => {
        setSnackOk(true);
        setSnackOkMensaje('Logueado con exito');
      })
      .catch((err) => {
        setSnackFail(true);
        setSnackFailMensaje(err.response.data.message);
      });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <NavBar />
      <Snackbar
        open={snackOk}
        autoHideDuration={2500}
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
      <Snackbar
        open={snackFail}
        autoHideDuration={2500}
        onClose={() => {
          setSnackFail(false);
          setSnackFailMensaje('');
        }}
      >
        <Alert severity="error" variant="filled">
          <AlertTitle>Mensaje de Error</AlertTitle>
          {snackFailMensaje}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundImage: `url('${logindoc24}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          position: 'relative',
          width: '1920p',
          height: '1080p',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Container
          component={Paper}
          elevation={5}
          sx={{
            width: {
              desktop: 400,
              laptop: 400,
              tablet: 400,
              mobile: '100%',
            },
            padding: '15px',
            marginTop: '145px',
            marginBottom: '133px',
            height: 'auto',
            minWidth: '200px',
            // backgroundColor:'#000'
          }}
        >
          <Typography variant="h6" align="center" sx={{ marginTop: '50px', marginBottom: '40px' }}>
            Ingreso exclusivo para profesionales
          </Typography>

          <Box
            component="form"
            className="login"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'column',
              height: '450px',
              p: 2,
            }}
          >
            <TextField
              required
              id="fieldset"
              defaultValue="Email"
              color="secondary"
              type="email"
              name="mail"
              value={localEmail}
              placeholder="Enter your mail"
              onChange={(event) => handleLocalEmailChange(event)}
              helperText={emailError ? <p>{emailHelperText}</p> : ''}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: emailError ? 'red' : 'secondary',
                  },
                  '&:hover fieldset': {
                    borderColor: emailError ? 'red' : 'secondary',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: emailError ? 'red' : 'secondary',
                    borderWidth: '2px',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: emailError ? 'red' : 'secondary',
                },
                height: '80px',
                width: '100%',
              }}
            ></TextField>

            <TextField
              required
              id="outlined-required"
              defaultValue="Password"
              color="secondary"
              type="password"
              name="password"
              value={localPassword}
              placeholder="Enter your password"
              onChange={(event) => handleLocalPasswordChange(event)}
              helperText={passwordError ? <p>{passwordHelperText}</p> : ''}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: passwordError ? 'red' : 'secondary',
                  },
                  '&:hover fieldset': {
                    borderColor: passwordError ? 'red' : 'secondary',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: passwordError ? 'red' : 'secondary',
                    borderWidth: '2px',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: passwordError ? 'red' : 'secondary',
                },
                height: '80px',
                width: '100%',
              }}
            ></TextField>

            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%', mb: 1 }}
              onClick={handleLocalSubmit}
              disabled={
                localEmail === '' && localPassword === ''
                  ? true
                  : emailError || passwordError
                  ? true
                  : false
              }
            >
              Ingresar
            </Button>
            <GoogleLogin
              clientId={clientID}
              //clientId="508619813355-m14kuspv71hdsu4s1u8bsl421a999cf8.apps.googleusercontent.com"
              buttonText="Iniciar sesión con Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            />
            <div className={user ? 'profile' : 'hidden'}>
              <img src={user.imageUrl} alt="" />
              <h3>{user.name}</h3>
            </div>
            <Typography>No tienes una cuenta?</Typography>
            <Button color="primary" href="/createDoctor">
              Crear cuenta
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default LoginDoctor;
