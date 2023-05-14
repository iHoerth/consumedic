import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import {
  Container,
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  imageListClasses,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import { useContext } from "react";




const Userlogin = () => {
  const navigate = useNavigate();
  const patients = useContext(Context)[1];

  const clientID =
    "508619813355-m14kuspv71hdsu4s1u8bsl421a999cf8.apps.googleusercontent.com";

  const [user, setUser] = useState({});

  const { createPatient, patientDetail } = patients;
  //estados de email y contraseña
  const [localEmail, setLocalEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  //estados de password
  const [localPassword, setLocalPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  //expresion regular para mails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  //funcion para validar email
  const handleLocalEmailChange = (event) => {
    setLocalEmail(event.target.value);

    // Validar el correo electrónico
    if (event.target.value === "") {
      setEmailError(true);
      setEmailHelperText("El correo electrónico es requerido.");
    } else if (emailRegex.test(event.target.value)) {
      setEmailError(true);
      setEmailHelperText("El correo electrónico no es válido.");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  };

  // funcion para validar contrasena
  const handleLocalPasswordChange = (event) => {
    setLocalPassword(event.target.value);
    if (event.target.value === "") {
      setPasswordError(true);
      setPasswordHelperText("ingrese su contrasena.");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }
  };

  //submit
  function handleLocalSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:3001/patients/login", {
        email: localEmail,
        password: localPassword,
      })
      .then((res) => {
        //autenticacion exitosa, redirige al panel del paciente
        navigate(`/patientpanel/${patientDetail.id}`);
      })
      .catch((err) => {
        //error de autenticacion
        console.error(err);
      });
  }

  const onSuccess = (response) => {
    console.log(response);
    setUser(response.profileObj);
    axios
      .post("http://localhost:3001/patients/login", {
        tokenId: response.tokenId,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/patientpanel/${patientDetail.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onFailure = () => {
    console.log("something went wrong");
  };

  return (
    <>
      <NavBar></NavBar>
      <Box
      sx={{
        backgroundImage: `url("https://clinicadoshopping.com.br/uploads/557b45753b84e18acd87861f5e7c169f.png")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container 
        component={Paper} 
        elevation={5} 
        sx={{ 
          width: "400px", 
          
        }}
      >
        <Typography variant="h6" align="center" sx={{ marginTop: "180px" }}>
          Ingresa tu cuenta
        </Typography>

        <Box
          component="form"
          className="login"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            height: "450px",
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
            helperText={emailError ? <p>{emailHelperText}</p> : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: emailError ? "red" : "secondary",
                },
                "&:hover fieldset": {
                  borderColor: emailError ? "red" : "secondary",
                },
                "&.Mui-focused fieldset": {
                  borderColor: emailError ? "red" : "secondary",
                  borderWidth: "2px",
                },
              },
              "& .MuiFormHelperText-root": {
                color: emailError ? "red" : "secondary",
              },
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
            helperText={passwordError ? <p>{passwordHelperText}</p> : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: passwordError ? "red" : "secondary",
                },
                "&:hover fieldset": {
                  borderColor: passwordError ? "red" : "secondary",
                },
                "&.Mui-focused fieldset": {
                  borderColor: passwordError ? "red" : "secondary",
                  borderWidth: "2px",
                },
              },
              "& .MuiFormHelperText-root": {
                color: passwordError ? "red" : "secondary",
              },
            }}
          ></TextField>

          <Button
            variant="contained"
            color="secondary"
            sx={{ margin: "10px" }}
            onClick={handleLocalSubmit}
          >
            Ingresar
          </Button>
          <GoogleLogin
            clientId={clientID}
            //clientId="508619813355-m14kuspv71hdsu4s1u8bsl421a999cf8.apps.googleusercontent.com"
            buttonText="Iniciar sesión con Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
          <div className={user ? "profile" : "hidden"}>
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
    </>
  );
};

export default Userlogin;
