import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar"
import { Container, Paper, TextField, Box, Button } from "@mui/material";
import { makeStyles } from "@mui/material";
const Userlogin = () => {

  //estados de email
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  

  //funcion para cambiar el estado del input
  function inputHandleChange(event) {

    const { name, value } = event.target;

    setEmail({ ...email, [name]: value });
    setPassword({ ...password, [name]: value });
  }
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
  }}

  //funcion para corroborar

  return (
    <>
      <NavBar></NavBar>
      <Container component={Paper} elevation={5}
        sx={{ width: '300px'}} >
        <div className="login_image">
          <h1 className="login_title">CONSUMEDIC</h1>
        </div>

        <Box component='form' className="login"
        sx={{display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',}}>
          <h2>LOG IN</h2>

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
                  borderColor: emailError ? 'red' : 'green',
                },
                '&:hover fieldset': {
                  borderColor: emailError ? 'red' : 'green',
                },
                '&.Mui-focused fieldset': {
                  borderColor: emailError ? 'red' : 'green',
                  borderWidth: '2px',
                },
              },
              '& .MuiFormHelperText-root': {
                color: emailError ? 'red' : 'green',
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
                  borderColor: passwordError ? 'red' : 'green',
                },
                '&:hover fieldset': {
                  borderColor: passwordError ? 'red' : 'green',
                },
                '&.Mui-focused fieldset': {
                  borderColor: passwordError ? 'red' : 'green',
                  borderWidth: '2px',
                },
              },
              '& .MuiFormHelperText-root': {
                color: passwordError ? 'red' : 'green',
              },
            }}
            ></TextField>


            <Button variant="contained" color="success" sx={{margin:'10px'}} >
              Ingresar
            </Button>
        </Box>
      </Container>
    </>

  )
}

export default Userlogin;