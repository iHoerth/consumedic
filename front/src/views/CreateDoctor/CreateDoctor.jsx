import { useContext, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import imagen8 from '../../assets/Img/8.jpg';
import NavBar from '../../components/NavBar/NavBar';
import {
  Container,
  Paper,
  Typography,
  Autocomplete,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Context, UtilitiesContext } from '../../context/ContextProvider';
import Footer from '../../components/Footer/Footer';
import { useMediaQuery, useTheme } from '@mui/material';

const typrographyError = styled(Typography)({
  fontSize: '8px',
  color: 'red',
  width: '40%',
});

const CrearDoctor = styled(Button)({
  margin: 'auto',
});
const Title = styled(Typography)({
  textAlign: 'center',
  fontSize: '30px',
  margin: '20px',
});

const StyleForm = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  width: '600px',
  height: '10  00px',
  margin: '100px auto',
  padding: '20px',
});

const CreateDoctor = () => {
  const navigate = useNavigate();
  const { createDoctor, doctorDetail, loginDoctor } = useContext(Context)[0];
  const { snackOk, snackOkMensaje, setSnackOk, setSnackOkMensaje } = useContext(Context)[0];
  const { snackFail, snackFailMensaje, setSnackFail, setSnackFailMensaje } = useContext(Context)[0];
  const theme = useTheme();
  const isScreenMedium = useMediaQuery(theme.breakpoints.down('716'));
  const isScreenSmall = useMediaQuery(theme.breakpoints.down('1030'));
  const { socialSecurity, specialties } = useContext(UtilitiesContext);
  const location = useLocation();
  const [fileName, setFileName] = useState('');
  const [open, setOpen] = useState();
  const [fileSize, setFileSize] = useState();
  const { session, setSession } = useContext(Context)[2];
  const [form, setForm] = useState({
    dni: '',
    numeroMatricula: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fotoMatricula: null,
    contrasena: '',
    confirmarContrasena: '',
    tituloUniversitario: '',
    descripcion: '',
    status: '',
    precioConsulta: '',
    esDoctor: false,
    idEspecialidad: '',
    idObraSocial: '',
  });

  const [error, setError] = useState({
    dni: '',
    numeroMatricula: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fotoMatricula: null,
    contrasena: '',
    confirmarContrasena: '',
    tituloUniversitario: '',
    descripcion: '',
    status: '',
    precioConsulta: '',
    esDoctor: false,
    idEspecialidad: '',
    idObraSocial: '',
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
      errors.nombre = 'El campo nombre es requerido';
    }

    if (!form.apellido) {
      errors.apellido = 'El campo apellido es requerido';
    }

    if (!form.email) {
      errors.email = 'El campo email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'El email ingresado no es válido';
    }

    if (!form.telefono) {
      errors.telefono = 'El campo teléfono es requerido';
    } else if (!/^\d{10,15}$/.test(form.telefono)) {
      errors.telefono = 'El número de teléfono debe contener entre 10 y 15 dígitos';
    }

    // if (!form.idObraSocial) {
    //   errors.idObraSocial = "El campo obra social es requerido";
    // }

    if (!form.dni) {
      errors.dni = 'El campo número de documento es requerido';
    } else if (!/^\d{7,8}$/.test(form.dni)) {
      errors.dni = 'El número de documento debe contener entre 7 y 8 dígitos';
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

    if (!form.tituloUniversitario) {
      errors.tituloUniversitario = 'El titulo universitario es requerido';
    }
    if (!form.direccion) {
      errors.direccion = 'La direccion donde atiente es requerido';
    }
    if (!form.fotoMatricula) {
      errors.fotoMatricula = 'La foto de perfil es requerida';
    }
    if (fileSize > 1) {
      errors.fotoMatricula = 'La foto debe tener menos de 1mb';
    }
    if (!form.idEspecialidad) {
      errors.idEspecialidad = 'El campo especialidad es requerido';
    }
    if (!form.idObraSocial) {
      errors.idObraSocial = 'El campo obra social es requerido';
    }
    if (!form.precioConsulta) {
      errors.precioConsulta = 'El precio de la consulta es requerido';
    }

    if (!form.numeroMatricula) {
      errors.numeroMatricula = 'El numero de matricula es requerido';
    } else if (!/^\d{5}$/.test(form.numeroMatricula)) {
      errors.numeroMatricula = 'El numero de matricula tiene que ser un numero de 5 digitos';
    }

    // if (typeof form.numeroMatricula !== 'number') {
    //   errors.numeroMatricula = "El numero de matricula tiene que ser un numero";
    // }
    // if (!form.numeroMatricula) {
    //   errors.numeroMatricula = "El numero de matricula es requerido";

    // }

    setError(errors);
    return Object.keys(errors).length === 0;
  }
  ///fn para contrasenas
  const handleCheckedPassword = () => {
    if (form.password !== form.confirmPassword) {
      setError({ ...error, confirmPassword: 'Las contraseñas no coinciden' });
    } else {
      setError({ ...error, confirmPassword: '' });
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
      status: 'active',
      precio: form.precioConsulta,
      idEspecialidad: form.idEspecialidad,
      idObraSocial: form.idObraSocial,
    };
    console.log(newDoctor);
    handleCheckedPassword();
    createDoctor(newDoctor)
      .then(() => {
        loginDoctor(newDoctor).then(() => {
          navigate('/perfilMedico');
        });
        setSnackOk(true);
        setSnackOkMensaje('Creado con exito');
      })
      .catch((err) => {
        setSnackFail(true);
        setSnackFailMensaje(err.response.data.message);
      });
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
    try {
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileSize = reader.result.length;
        fileSize = (fileSize / 1024 / 1024).toFixed(2);
        setFileSize(fileSize);
        console.log(`File size: ${fileSize} kb`);
      };
      reader.onloadend = () => {
        setForm({
          ...form,
          fotoMatricula: reader.result,
        });
        setFileName(file.name);
        validarForm({ ...form, fotoMatricula: reader.result });
      };
    } catch (error) {
      return;
    }
  };

  const handleEspecialidad = (selectedOptionsE) => {
    const property = 'idEspecialidad';
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
    const property = 'idObraSocial';
    const values = selectedOptions.map((option) => Number(option.id));
    console.log(property);
    console.log(values);
    setForm({
      ...form,
      [property]: values,
    });

    validarForm({ ...form, [property]: values });
  };

  useEffect(() => {
    if (location.state) {
      setForm({
        ...form,
        nombre: location.state.givenName,
        apellido: location.state.familyName,
        email: location.state.email,
      });
    }
  }, [location?.state]);
  return (
    <>
      <NavBar></NavBar>
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
      <Container
        sx={{
          backgroundImage: `url('${imagen8}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '@media (max-width: 600px)': {
            height: {
              xs: '50vh',
              sm: '60vh',
              md: '70vh',
              lg: '80vh',
            },
          },
        }}
      >
        <StyleForm
          component={Paper}
          elevation={5}
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'rgba(255, 255, 255)',
            marginTop:   isScreenMedium ? '230px': isScreenSmall ? '250px' : '256.4px' ,
          }}
          sx={{
            width: {
              mobile: '100%',
              tablet: '80%',
              laptop: '80%',
              desktop: '50%',
            }
          }}
        >
          <Grid container spacing={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // justifyContent:'space-around'
            }}>
            <Title>Crear Usuario Profesional</Title>
            <Container sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around'
              }}>
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
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.nombre}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
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
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.apellido}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
                  }}
                />
              </Grid>
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
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.dni}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
                  }}
                />
              </Grid>
              <Grid item xs={12} marginBottom={2}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="fotoMatricula"
                  name="fotoMatricula"
                  type="file"
                  onChange={handleImage}
                  helperText={
                    error.fotoMatricula ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.fotoMatricula}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
                  }}
                />
                <label htmlFor="fotoMatricula">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                    sx={{
                      height: '55px',
                      width: '250px',
                    }}
                  >
                    Foto de Perfil
                  </Button>
                </label>
                {form.fotoMatricula && <span>{form.fotoMatricula.name}</span>}
                {fileName ? (
                  <Typography
                    variant="inherit"
                    style={{ maxWidth: '180px', fontSize: '12px', margin: '6px' }}
                  >
                    {fileName}
                  </Typography>
                ) : null}
                {error.fotoMatricula ? (
                  <Typography
                    variant="inherit"
                    color="error"
                    style={{ maxWidth: '180px', fontSize: '12px', margin: '6px' }}
                  >
                    {error.fotoMatricula}
                  </Typography>
                ) : null}
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
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.email}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
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
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.telefono}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
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
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.direccion}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
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
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.numeroMatricula}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '100px',
                    width: '250px',
                  }}
                />
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
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.tituloUniversitario}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
                  }}
                />
              </Grid>
              <Grid item xs={12} marginBottom={12}>
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
                    height: '20px',
                    width: '250px',
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
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '100px',
                    width: '250px',
                  }}
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
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                  sx={{
                    height: '90px',
                    width: '250px',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  sx={{
                    width: 250,
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
                      sx={{ bgcolor: 'white', borderRadius: '4px' }}
                      {...params}
                      label="Especialidad"
                      helperText={
                        error.idEspecialidad ? (
                          <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                            {error.idEspecialidad}
                          </Typography>
                        ) : null
                      }
                    />
                  )}
                  renderOption={(props, option) => (
                    <li
                      style={{ fontSize: '14px' }}
                      {...props}
                      key={option.id}
                      id={option.id}
                      value={option.name}
                    >
                      {option.name}
                    </li>
                  )}
                  onChange={(selectedOptionsE, value) => handleEspecialidad(value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  sx={{
                    marginTop: isScreenMedium ? '40px' : '',
                    width: '250px'
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
                      sx={{ bgcolor: 'white', borderRadius: '4px' }}
                      {...params}
                      label="Obra Social"
                      helperText={
                        error.idObraSocial ? (
                          <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                            {error.idObraSocial}
                          </Typography>
                        ) : null
                      }
                    />
                  )}
                  renderOption={(props, option) => (
                    <li
                      style={{ fontSize: '14px' }}
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
                  sx={{
                    margin: isScreenSmall ? '40px' : '',
                    width: '250px'
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={form.precioConsulta}
                  onChange={handleChange}
                  helperText={
                    error.precioConsulta ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.precioConsulta}
                      </Typography>
                    ) : null
                  }
                  FormHelperTextProps={{ style: { maxWidth: '200px' } }}
                // sx={{
                //   height: '90px',
                //   width: '250px',
                // }}
                />
              </Grid>
            </Container>
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '400px',
                marginTop:'10px',
                flexDirection: {
                  mobile: 'column',
                  tablet: 'row',
                  laptop: 'row',
                  desktop: 'row',
                }
              }}>
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
                  disabled={
                    error.apellido ||
                    error.confirmarContrasena ||
                    error.contrasena ||
                    error.direccion ||
                    error.dni ||
                    error.email ||
                    error.fotoMatricula ||
                    error.idEspecialidad ||
                    error.idObraSocial ||
                    error.numeroMatricula ||
                    error.precioConsulta ||
                    error.telefono ||
                    error.tituloUniversitario
                  }
                >
                  Crear usuario
                </CrearDoctor>
              </Grid>
            </Container>
          </Grid>
        </StyleForm>
      </Container>
      <Footer></Footer>
    </>
  );
};
export default CreateDoctor;
