import { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import imagen8 from "../../assets/Img/8.jpg";
import NavBar from "../../components/NavBar/NavBar";
import { Container, Paper, Typography, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context, UtilitiesContext } from "../../context/ContextProvider";
import { FormHelperText } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const typrographyError = styled(Typography)({
  fontSize: "8px",
  color: "red",
  width: "40%",
});

const CrearDoctor = styled(Button)({
  margin: "auto",
});
const Title = styled(Typography)({
  textAlign: "center",
  fontSize: "30px",
  margin: "20px",
});

const StyleForm = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  width: "600px",
  height: "10  00px",
  margin: "100px auto",
  padding: "20px",
});

const CreateDoctor = () => {
  const navigate = useNavigate();
  const doctor = useContext(Context)[0];
  const { socialSecurity, specialties } = useContext(UtilitiesContext);
  const { createDoctor, doctorDetail } = doctor;

  const [form, setForm] = useState({
    dni: "",
    numeroMatricula: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    fotoMatricula: null,
    contrasena: "",
    confirmarContrasena: "",
    tituloUniversitario: "",
    descripcion: "",
    status: "",
    precioConsulta: "",
    esDoctor: false,
    idEspecialidad: "",
    idObraSocial: "",
  });

  const [error, setError] = useState({
    dni: "",
    numeroMatricula: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    fotoMatricula: null,
    contrasena: "",
    confirmarContrasena: "",
    tituloUniversitario: "",
    descripcion: "",
    status: "",
    precioConsulta: "",
    esDoctor: false,
    idEspecialidad: "",
    idObraSocial: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });

    validarForm({ ...form, [property]: value });
  };

  function validarForm(form) {
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

    // if (!form.idObraSocial) {
    //   errors.idObraSocial = "El campo obra social es requerido";
    // }

    if (!form.dni) {
      errors.dni = "El campo número de documento es requerido";
    } else if (!/^\d{7,8}$/.test(form.dni)) {
      errors.dni = "El número de documento debe contener entre 7 y 8 dígitos";
    }

    if (!form.contrasena) {
      errors.contrasena = "El campo contraseña es requerido";
    } else if (form.contrasena.length < 8) {
      errors.contrasena = "La contraseña debe contener al menos 8 caracteres";
    }

    if (!form.confirmarContrasena) {
      errors.confirmarContrasena = "El campo confirmar contraseña es requerido";
    } else if (form.contrasena !== form.confirmarContrasena) {
      errors.confirmarContrasena = "Las contraseñas no coinciden";
    }

    if (!form.tituloUniversitario) {
      errors.tituloUniversitario = "El titulo universitario es requerido";
    }
    if (!form.direccion) {
      errors.direccion = "La direccion donde atiente es requerido";
    }
    if (!form.fotoMatricula) {
      errors.fotoMatricula = "La foto de la matricula es requerida";
    }
    if (!form.idEspecialidad) {
      errors.idEspecialidad = "El campo especialidad es requerido";
    }
    if (!form.idObraSocial) {
      errors.idObraSocial = "El campo obra social es requerido";
    }
    if (!form.precioConsulta) {
      errors.precioConsulta = "El precio de la consulta es requerido";
    }
    if (!form.numeroMatricula) {
      errors.numeroMatricula = "El numero de matricula es requerido";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  }
  ///fn para contrasenas
  const handleCheckedPassword = () => {
    if (form.password !== form.confirmPassword) {
      setError({ ...error, confirmPassword: "Las contraseñas no coinciden" });
    } else {
      setError({ ...error, confirmPassword: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validarForm(form);
    setError(errors);
    const newDoctor = {
      dni: form.dni,
      NumMatricula: form.numeroMatricula,
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      telefono: form.telefono,
      direccion: form.direccion,
      imagen: form.fotoMatricula,
      password: form.contrasena,
      titulo: form.tituloUniversitario,
      Descripcion: form.descripcion,
      isDoctor: true,
      status: "active",
      precio: form.precioConsulta,
      idEspecialidad: form.idEspecialidad,
      idObraSocial: form.idObraSocial,
    };
    console.log(newDoctor);
    handleCheckedPassword();
    createDoctor(newDoctor);
    navigate(`/perfilMedico/`);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setForm({
        ...form,
        fotoMatricula: reader.result,
      });
    };
  };

  const handleEspecialidad = (selectedOptionsE) => {
    const property = "idEspecialidad";
    const values = selectedOptionsE.map((option) => Number(option.id));
    console.log(property);
    console.log(values);
    setForm({
      ...form,
      [property]: values,
    });

    validarForm({ ...form, [property]: values });
  };

  const handleObraSocial = (selectedOptions) => {
    const property = "idObraSocial";
    const values = selectedOptions.map((option) => Number(option.id));
    console.log(property);
    console.log(values);
    setForm({
      ...form,
      [property]: values,
    });

    validarForm({ ...form, [property]: values });
  };

  return (
    <>
      <NavBar></NavBar>
      <Container
        sx={{
          backgroundImage: `url('${imagen8}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "@media (max-width: 600px)": {
            height: {
              xs: "50vh",
              sm: "60vh",
              md: "70vh",
              lg: "80vh",
            },
          },
        }}
      >
        <StyleForm
          component={Paper}
          elevation={5}
          onSubmit={handleSubmit}
          style={{ backgroundColor: "rgba(255, 255, 255)" }}
        >
          <Grid container spacing={2}>
            <Title>Crear usuario doctor</Title>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="dni"
                name="dni"
                label="Documento"
                fullWidth
                value={form.dni}
                onChange={handleChange}
                helperText={
                  error.dni ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.dni}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nombre"
                name="nombre"
                label="Nombre"
                fullWidth
                value={form.nombre}
                onChange={handleChange}
                helperText={
                  error.nombre ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.nombre}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="apellido"
                name="apellido"
                label="Apellido"
                fullWidth
                value={form.apellido}
                onChange={handleChange}
                helperText={
                  error.apellido ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.apellido}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Correo electrónico"
                fullWidth
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                helperText={
                  error.email ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.email}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="telefono"
                name="telefono"
                label="Teléfono"
                type="number"
                fullWidth
                value={form.telefono}
                onChange={handleChange}
                helperText={
                  error.telefono ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.telefono}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="direccion"
                name="direccion"
                label="Dirección donde atiende"
                fullWidth
                value={form.direccion}
                onChange={handleChange}
                helperText={
                  error.direccion ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.direccion}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="numeroMatricula"
                name="numeroMatricula"
                label="Número de matrícula"
                fullWidth
                value={form.numeroMatricula}
                onChange={handleChange}
                helperText={
                  error.numeroMatricula ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.numeroMatricula}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "100px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="fotoMatricula"
                name="fotoMatricula"
                type="file"
                onChange={handleImage}
                helperText={
                  error.fotoMatricula ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.fotoMatricula}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
              <label htmlFor="fotoMatricula">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                  sx={{
                    height: "55px",
                    width: "250px",
                  }}
                >
                  Foto de matrícula
                </Button>
              </label>
              {form.fotoMatricula && <span>{form.fotoMatricula.name}</span>}
              {error.fotoMatricula ? (
                <Typography
                  variant="inherit"
                  color="error"
                  style={{ maxWidth: "180px", fontSize: "12px", margin: "6px" }}
                >
                  {error.fotoMatricula}
                </Typography>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="tituloUniversitario"
                name="tituloUniversitario"
                label="Título universitario"
                fullWidth
                value={form.tituloUniversitario}
                onChange={handleChange}
                helperText={
                  error.tituloUniversitario ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.tituloUniversitario}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="descripcion"
                name="descripcion"
                label="Descripción"
                fullWidth
                multiline
                rows={3}
                value={form.descripcion}
                onChange={handleChange}
                sx={{
                  height: "20px",
                  width: "250px",
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
            <TextField
              required
              id="status"
              name="status"
              label="Estado"
              fullWidth
              value={form.status}
              onChange={handleChange}
            />
          </Grid> */}

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="contrasena"
                name="contrasena"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                fullWidth
                autoComplete="new-password"
                value={form.contrasena}
                onChange={handleChange}
                helperText={
                  error.contrasena ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.contrasena}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "100px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmarContrasena"
                name="confirmarContrasena"
                label="Confirmar contraseña"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={form.confirmarContrasena}
                onChange={handleChange}
                helperText={
                  error.confirmarContrasena ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.confirmarContrasena}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                sx={{
                  width: 240,
                }}
                disablePortal
                id="especialidad"
                name="especialidad"
                options={specialties}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ bgcolor: "white", borderRadius: "4px" }}
                    {...params}
                    label="Especialidad"
                    helperText={
                      error.idEspecialidad ? (
                        <Typography
                          variant="inherit"
                          color="error"
                          style={{ maxWidth: "200px" }}
                        >
                          {error.idEspecialidad}
                        </Typography>
                      ) : null
                    }
                  />
                )}
                renderOption={(props, option) => (
                  <li
                    style={{ fontSize: "14px" }}
                    {...props}
                    key={option.id}
                    id={option.id}
                    value={option.name}
                  >
                    {option.name}
                  </li>
                )}
                onChange={(selectedOptionsE, value) =>
                  handleEspecialidad(value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                sx={{
                  width: 240,
                }}
                disablePortal
                id="obraSocial"
                name="obraSocial"
                options={socialSecurity}
                getOptionLabel={(option) => {
                  return option.nombre;
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ bgcolor: "white", borderRadius: "4px" }}
                    {...params}
                    label="Obra Social"
                    helperText={
                      error.idObraSocial ? (
                        <Typography
                          variant="inherit"
                          color="error"
                          style={{ maxWidth: "200px" }}
                        >
                          {error.idObraSocial}
                        </Typography>
                      ) : null
                    }
                  />
                )}
                renderOption={(props, option) => (
                  <li
                    style={{ fontSize: "14px" }}
                    {...props}
                    key={option.id}
                    id={option.id}
                    value={option.name}
                  >
                    {option.nombre}
                  </li>
                )}
                onChange={(selectedOptions, value) => handleObraSocial(value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="precioConsulta"
                name="precioConsulta"
                label="Precio de consulta"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={form.precioConsulta}
                onChange={handleChange}
                helperText={
                  error.precioConsulta ? (
                    <Typography
                      variant="inherit"
                      color="error"
                      style={{ maxWidth: "200px" }}
                    >
                      {error.precioConsulta}
                    </Typography>
                  ) : null
                }
                FormHelperTextProps={{ style: { maxWidth: "200px" } }}
                sx={{
                  height: "90px",
                  width: "250px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={handleShowPassword}
                    color="primary"
                    label="Show Password"
                  />
                }
                label="Ver contrasenas"
              />
            </Grid>
            <Grid item xs={12}>
              <CrearDoctor
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Crear usuario
              </CrearDoctor>
            </Grid>
          </Grid>
        </StyleForm>
      </Container>
      <Footer></Footer>
    </>
  );
};
export default CreateDoctor;
