import { useEffect, useState, useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {
  Container,
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  useTheme,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

import { Context } from '../../context/ContextProvider';
import login21 from '../../assets/Img/login21.jpg';

const Userlogin = () => {
  const { patientDetail, loginPatient } = useContext(Context)[1];
  const { snackOk, snackOkMensaje, setSnackOk, setSnackOkMensaje } = useContext(Context)[1];
  const { snackFail, snackFailMensaje, setSnackFail, setSnackFailMensaje } = useContext(Context)[1];
  const [user, setUser] = useState({});
  const clientID = '508619813355-m14kuspv71hdsu4s1u8bsl421a999cf8.apps.googleusercontent.com';
  const theme = useTheme();
  const navigate = useNavigate();

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
  // function handleLocalSubmit(event) {
  //   event.preventDefault();
  //   loginPatient({ email: localEmail, password: localPassword, isDoctor:false, }).catch((err) => {
  //     setSnackFail(true);
  //     setSnackFailMensaje(err.response.data.message);
  //   });
  // }

  function handleLocalSubmit(event) {
    event.preventDefault();
    loginPatient({ email: localEmail, password: localPassword, isDoctor: false })
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

  useEffect(() => {
    patientDetail.id && navigate(`/patientpanel/`);
  }, [patientDetail]);

  const onSuccess = (response) => {
    console.log(response);
    try {
      setUser(response.profileObj);
      loginPatient({
        loggedFromGoogle: true,
        email: response.profileObj.email,
        token: response.tokenId,
        nombre: response.profileObj.givenName,
        apellido: response.profileObj.familyName,
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const onFailure = () => {
    console.log('something went wrong');
  };

  return (
    <>
      <NavBar />
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
          backgroundImage: `url('${login21}')`,
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
            marginBottom: '50px',
            minWidth: '200px',
            height: '613px',
          }}
        >
          <Typography variant="h6" align="center" sx={{ marginTop: '50px', marginBottom: '20px' }}>
            Ingresa tu cuenta
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
              sx={{ margin: '10px', width: '100%' }}
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
            <Button color="primary" href="/create">
              Crear cuenta
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Userlogin;
