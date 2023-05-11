import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar"
import { Container, Paper, TextField, Box, Button, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import PatientNewUser from "../CreatePatient/PatientNewUser";
const Userlogin = () => {

  //estados de email
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  //expresion regular para mails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //funcion para validar email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    // Validar el correo electrónico
    if (event.target.value === '') {
      setEmailError(true);
      setEmailHelperText('El correo electrónico es requerido.');
    } else if (emailRegex.test(event.target.value)) {
      setEmailError(true);
      setEmailHelperText('El correo electrónico no es válido.');
    } else {
      setEmailError(false);
      setEmailHelperText('');
    }
  }

  //estados de password
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');

  // funcion para validar contrasena
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value === '') {
      setPasswordError(true);
      setPasswordHelperText('ingrese su contrasena.');
    } else {
      setPasswordError(false);
      setPasswordHelperText('');
    }
  }

  //funcion para corroborar

  return (
    <>
      <NavBar></NavBar>
      <Container component={Paper} elevation={5}
        sx={{ width: '300px' }} >
        <Typography variant='h6' m={2} align='center'>Ingresa tu cuenta</Typography>

        <Box component='form' className="login"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
          }}>

          <TextField required id="fieldset"
            defaultValue="Email"
            color="secondary"
            type="email"
            name="mail"
            value={email} placeholder="Enter your mail"
            onChange={(event) => handleEmailChange(event)}
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
            }}
          >

          </TextField>


          <TextField required id="outlined-required"
            defaultValue="Password"
            color="secondary" type="password"
            name="password" value={password}
            placeholder="Enter your password"
            onChange={(event) => handlePasswordChange(event)}
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
            }}
          ></TextField>


          <Button variant="contained" color="secondary" sx={{ margin: '10px' }}
            href="/patientpanel" >
            Ingresar
          </Button>
          <Button variant="contained" color="secondary" sx={{ margin: '10px' }}
            href="#" >
            <Google></Google>Ingresar con Google
          </Button>
          <Typography>No tienes una cuenta?</Typography>
          <Button color="primary" href="/create">Crear cuenta</Button>
        </Box>
      </Container>
    </>

  )
}

export default Userlogin;