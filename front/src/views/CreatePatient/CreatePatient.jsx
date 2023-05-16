import { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import NavBar from '../../components/NavBar/NavBar';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/ContextProvider';

const StyleForm = styled(Container)({
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'column',
  width: '600px',
  height:'10  00px',
  margin: "100px auto",
  padding: '20px',
})
const Createpaciente = styled(Button)({
  marginLeft: '200px',

})
const Title = styled(Typography)({
  textAlign: 'center',
  fontSize: '50px',
  margin: 'auto'
});

const CreatePatient = () => {
  const navigate = useNavigate()
  const patients = useContext(Context)[0];
  const { createPatient, patientDetail } = patients;


  const [form, setForm] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: '',
    esDoctor: false,
  });

  const [error, setError] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: '',
    esDoctor: false,
    idObraSocial:''
  });


  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });

    validarForm({ ...form, [property]: value })
  };

  const handleFileChange = (event) => {
    setForm({
      ...form,
      fotoMatricula: event.target.files[0],
    });
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

    if (!form.idObraSocial) {
      errors.idObraSocial = "El campo obra social es requerido";
    }

    if (!form.dni) {
      errors.dni = "El campo número de documento es requerido";
    } else if (!/^\d{7,8}$/.test(form.dni)) {
      errors.dni = "El número de documento debe contener entre 7 y 8 dígitos";
    }

    if (!form.contrasena) {
      errors.contrasena = 'El campo contraseña es requerido';
    } else if (form.contrasena.length < 8) {
      errors.contrasena = 'La contraseña debe contener al menos 8 caracteres';
    }

    if (!form.confirmarContrasena) {
      errors.confirmarContrasena = 'El campo confirmar contraseña es requerido';
    } else if (form.contrasena !== form.confirmarContrasena) {
      errors.confirmarContrasena = 'Las contraseñas no coinciden';
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
    handleCheckedPassword();
    createPatient({ ...form, isDoctor: true })
    navigate(`/patientpanel/${patientDetail.id}`);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavBar></NavBar>
      <StyleForm component={Paper} elevation={5}
        onSubmit={handleSubmit} >
           <Title>Registrarme</Title>
        <Grid container spacing={2}>
         
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="dni"
              name="dni"
              label="Documento"
              type='number'
              fullWidth
              value={form.dni}
              onChange={handleChange}
              helperText={
                error.dni ? (
                  <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                    {error.dni}
                  </Typography>
                ) : null
              }
              FormHelperTextProps={{ style: {  maxWidth: '200px'} }}
            />

          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nombre"
              name="nombre"
              label="Nombre"
              type='text'
              fullWidth
              value={form.nombre}
              onChange={handleChange}
              helperText={
                error.nombre ? (
                  <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                    {error.nombre}
                  </Typography>
                ) : null
              }
              FormHelperTextProps={{ style: {  maxWidth: '200px'} }}
            />

          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="apellido"
              name="apellido"
              label="Apellido"
              type='text'
              fullWidth
              value={form.apellido}
              onChange={handleChange}
              helperText={
                error.apellido ? (
                  <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                    {error.apellido}
                  </Typography>
                ) : null
              }
              FormHelperTextProps={{ style: {  maxWidth: '200px'} }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Correo electrónico"
              type='email'
              fullWidth
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              helperText={
                error.email ? (
                  <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                    {error.email}
                  </Typography>
                ) : null
              }
              FormHelperTextProps={{ style: {  maxWidth: '200px'} }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="telefono"
              name="telefono"
              label="Teléfono"
              type='number'
              fullWidth
              value={form.telefono}
              onChange={handleChange}
              helperText={
                error.telefono ? (
                  <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                    {error.telefono}
                  </Typography>
                ) : null
              }
              FormHelperTextProps={{ style: {  maxWidth: '200px'} }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="contrasena"
              name="contrasena"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              autoComplete="new-password"
              value={form.contrasena}
              onChange={handleChange}
              helperText={
                error.contrasena ? (
                  <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                    {error.contrasena}
                  </Typography>
                ) : null
              }
              FormHelperTextProps={{ style: {  maxWidth: '200px'} }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="confirmarContrasena"
              name="confirmarContrasena"
              label="Confirmar contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={form.confirmarContrasena}
              onChange={handleChange}
              helperText={
                error.confirmarContrasena ? (
                  <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                    {error.confirmarContrasena}
                  </Typography>
                ) : null
              }
              FormHelperTextProps={{ style: {  maxWidth: '200px'} }}
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
            <Createpaciente type="submit" variant="contained" color="primary">
              Crear usuario
            </Createpaciente>
          </Grid>
        </Grid>
      </StyleForm>
      </>
  )
}
export default CreatePatient;  
