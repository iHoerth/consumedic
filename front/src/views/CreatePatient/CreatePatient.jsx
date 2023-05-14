import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Paper,
  Typography,
  Checkbox,
  Container,
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { Context } from "../../context/ContextProvider";
import axios from "axios";

import create31 from '../Img/create31.jpg'


const CreatePatient = () => {
  const navigate = useNavigate();
  const patients = useContext(Context)[1];
  const { createPatient, patientDetail } = patients;

  const verpatients = () => {
    console.log(patients.doctors);
  };

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    idObraSocial: "",
    dni: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    nombre: "",
    apellido: "",
    idObraSocial: "",
    dni: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const [obraSocial, setObraSocial] = useState();

  const handleFormChange = (event) => {
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

    if (!form.nombre) {
      errors.nombre = "El campo nombre es requerido";
    }

    if (!form.apellido) {
      errors.apellido = "El campo apellido es requerido";
    }

    if (!form.email) {
      errors.email = "El campo email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "El email ingresado no es válido";
    }

    if (!form.telefono) {
      errors.telefono = "El campo teléfono es requerido";
    } else if (!/^\d{10}$/.test(form.phone)) {
      errors.phone = "El número de teléfono debe contener 10 dígitos";
    }

    if (!form.idObraSocial) {
      errors.idObraSocial = "El campo obra social es requerido";
    }

    if (!form.dni) {
      errors.dni = "El campo número de documento es requerido";
    } else if (!/^\d{7,8}$/.test(form.dni)) {
      errors.dni = "El número de documento debe contener entre 7 y 8 dígitos";
    }

    if (!form.password) {
      errors.password = "El campo contraseña es requerido";
    } else if (form.password.length < 8) {
      errors.password = "La contraseña debe contener al menos 8 caracteres";
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = "El campo confirmar contraseña es requerido";
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validateForm(form);
    setError(errors);
    handleCheckedPassword();
    createPatient({ ...form, isDoctor: false });
    navigate(`/patientpanel/${patientDetail.id}`);
  }

  const handleCheckedPassword = () => {
    if (form.password !== form.confirmPassword) {
      setError({ ...error, confirmPassword: "Las contraseñas no coinciden" });
    } else {
      setError({ ...error, confirmPassword: "" });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/socialSecurity")
      .then((res) => {
        console.log(res.data);
        setObraSocial(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{
          backgroundImage: `url('${create31}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          position: "absolute",
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
          // width: "300px",
          display: "flex",
          justifycontent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          minWidth: "300px", 
          width: "400px", 
          padding: "50px",
          mt: '180px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl required>
            <Typography variant="h6" align="center">
              Crear nuevo usuario
            </Typography>
            <TextField
              id="name"
              label="Nombre"
              color="secondary"
              value={form.nombre}
              name="nombre"
              onChange={(event) => handleFormChange(event)}
              helperText={
                error.name ? (
                  <Typography color="error">{error.name}</Typography>
                ) : (
                  ""
                )
              }
              required
            />

            <TextField
              id="apellido"
              label="Apelido"
              color="secondary"
              value={form.apellido}
              name="apellido"
              onChange={(event) => handleFormChange(event)}
              helperText={
                error.apellido ? (
                  <Typography color="error">{error.apellido}</Typography>
                ) : (
                  ""
                )
              }
              required
            />
            <TextField
              id="email"
              label="Email"
              color="secondary"
              value={form.email}
              name="email"
              onChange={(event) => handleFormChange(event)}
              helperText={
                error.email ? (
                  <Typography color="error">{error.email}</Typography>
                ) : error.vacio ? (
                  <Typography>{error.vacio}</Typography>
                ) : (
                  ""
                )
              }
              required
            />

            <TextField
              id="phone"
              label="Telefono"
              color="secondary"
              value={form.telefono}
              name="telefono"
              onChange={(event) => handleFormChange(event)}
              helperText={
                error.telefono ? (
                  <Typography color="error">{error.telefono}</Typography>
                ) : (
                  ""
                )
              }
              required
            />

            <InputLabel id="insurance-label" color="secondary">
              Obra social
            </InputLabel>
            <Select
              style={{ width: "200px" }}
              labelId="insurance-label"
              id="idObraSocial"
              color="secondary"
              value={form.idObraSocial}
              name="idObraSocial"
              onChange={(event) => handleFormChange(event)}
            >
              {obraSocial ? (
                obraSocial.map((item) => (
                  <MenuItem value={item.id}>{item.nombre}</MenuItem>
                ))
              ) : (
                <p>Chau</p>
              )}
            </Select>

            <TextField
              id="document-number"
              label="Número de documento"
              type="number"
              color="secondary"
              value={form.dni}
              name="dni"
              onChange={(event) => handleFormChange(event)}
              helperText={
                error.dni ? (
                  <Typography color="error">{error.dni}</Typography>
                ) : (
                  ""
                )
              }
              required
            />

            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              color="secondary"
              value={form.password}
              name="password"
              onChange={(event) => handleFormChange(event)}
              helperText={
                error.password ? (
                  <Typography color="error">{error.password}</Typography>
                ) : (
                  ""
                )
              }
              required
            />

            <TextField
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              label="Confirmar password"
              color="secondary"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={(event) => handleFormChange(event)}
              helperText={
                error.confirmPassword ? (
                  <Typography color="error">{error.confirmPassword}</Typography>
                ) : (
                  ""
                )
              }
              required
            />

            <Typography>
              Mostrar contrasenas
              <Checkbox
                checked={showPassword}
                onChange={handleShowPassword}
                color="primary"
                label="Show Password"
              />
            </Typography>

            <br />
            <br />
            <Button
              sx={{ marginBottom: "20px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Crear usuario
            </Button>
          </FormControl>
        </form>
        </Container>
      </Box>
    </>
  );
};

export default CreatePatient;
