import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  MenuItem,
  FormControl,
  Button,
  Box,
  Paper,
  Typography,
  Checkbox,
  Container,
  Select,
  InputLabel,
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { Context } from "../../context/ContextProvider";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

import create31 from "../../assets/Img/create31.jpg";

const CreatePatient = () => {
  const navigate = useNavigate();
  const patients = useContext(Context)[1];
  const { createPatient, patientDetail } = patients;

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

  //

  // const ObraSocialSelect = ({ obraSocial, form, handleFormChange, error }) => {
  //   const [selectedValue, setSelectedValue] = useState(form.obraSocial)
  // };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    // setSelectedValue(value);
    handleFormChange({ target: { name, value } });
  };

  //

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
          paddingBottom: "20%",
        }}
      >
        <Container
          component={Paper}
          elevation={5}
          sx={{
            display: "flex",
            justifycontent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            minWidth: "300px",
            width: "500px",
            padding: "10px",
            marginTop: "10%",
            marginBottom: "3%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl
              variant="outlined"
              sx={{
                minWidth: "300px",
                marginBottom: "10%",
              }}
              required
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ marginTop: "50px", marginBottom: "30px" }}
              >
                Crear nuevo usuario
              </Typography>

              {/* Nombre */}

              <TextField
                id="name"
                label="Nombre"
                color="secondary"
                value={form.nombre}
                name="nombre"
                onChange={(event) => handleFormChange(event)}
                sx={{ height: "110px", width: "400px" }}
                helperText={
                  error.nombre ? (
                    <Typography color="error">{error.nombre}</Typography>
                  ) : (
                    ""
                  )
                }
                required
                
              />

              {/* Apellido */}

              <TextField
                id="apellido"
                label="Apellido"
                color="secondary"
                value={form.apellido}
                name="apellido"
                onChange={(event) => handleFormChange(event)}
                sx={{height: "110px", width: "400px" }}
                helperText={
                  error.apellido ? (
                    <Typography color="error">{error.apellido}</Typography>
                  ) : (
                    ""
                  )
                }
                required
              />

              {/* Email */}

              <TextField
                id="email"
                label="Email"
                color="secondary"
                value={form.email}
                name="email"
                onChange={(event) => handleFormChange(event)}
                sx={{ height: "110px", width: "400px" }}
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

              {/* Telefono */}

              <TextField
                id="phone"
                label="Telefono"
                color="secondary"
                value={form.telefono}
                name="telefono"
                onChange={(event) => handleFormChange(event)}
                sx={{ height: "110px", width: "400px" }}
                helperText={
                  error.telefono ? (
                    <Typography color="error">{error.telefono}</Typography>
                  ) : (
                    ""
                  )
                }
                required
              />

              {/* Obra Social */}

              <FormControl sx={{ minWidth: 200, height: "100px" }}>
                <InputLabel id="obra-social-label" color="secondary">
                  Obra Social
                </InputLabel>
                <Select
                  labelId="obra-social-label"
                  id="idObraSocial"
                  color="secondary"
                  value={form.idObraSocial}
                  name="idObraSocial"
                  onChange={handleFormChange}
                  error={!!error.idObraSocial}
                >
                  <MenuItem value="">
                    <em>Seleccionar Obra Social</em>
                  </MenuItem>
                  {obraSocial ? (
                    obraSocial.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">
                      <em>No se encontraron obras sociales</em>
                    </MenuItem>
                  )}
                </Select>
                {error.idObraSocial && (
                  <Typography error={true}>{error.idObraSocial}</Typography>
                )}
              </FormControl>

              {/* Documento */}

              <TextField
                id="document-number"
                label="Número de documento"
                type="number"
                color="secondary"
                value={form.dni}
                name="dni"
                onChange={(event) => handleFormChange(event)}
                sx={{ height: "110px", width: "400px" }}
                helperText={
                  error.dni ? (
                    <Typography color="error">{error.dni}</Typography>
                  ) : (
                    ""
                  )
                }
                required
              />

              {/* Password */}

              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                color="secondary"
                value={form.password}
                name="password"
                onChange={(event) => handleFormChange(event)}
                sx={{ height: "110px", width: "400px" }}
                helperText={
                  error.password ? (
                    <Typography color="error">{error.password}</Typography>
                  ) : (
                    ""
                  )
                }
                required
              />

              {/* Confirmar Password */}

              <TextField
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                label="Confirmar password"
                color="secondary"
                value={form.confirmPassword}
                name="confirmPassword"
                onChange={(event) => handleFormChange(event)}
                sx={{ height: "110px", width: "400px" }}
                helperText={
                  error.confirmPassword ? (
                    <Typography color="error">
                      {error.confirmPassword}
                    </Typography>
                  ) : (
                    ""
                  )
                }
                required
              />

              <Typography>
                Mostrar contraseñas
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
                sx={{ marginBottom: "10px" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Crear usuario
              </Button>
            </FormControl>
          </form>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default CreatePatient;
