import { useState, useContext, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  Button,
  Box,
  Typography,
  Divider,
  TextField,
  Avatar,
  Autocomplete,
  Snackbar,
  Alert,
  AlertTitle,
  FormHelperText,
} from '@mui/material';

import Loading from '../Loading/Loading';

import { Context, UtilitiesContext } from '../../context/ContextProvider';
import { Stack } from '@mui/system';

import { styled } from '@mui/material/styles';

const EditarPerfil = ({ doctorDetail1, status, modalOpen, handleModalClose }) => {
  const { session } = useContext(Context)[2];
  const {
    id,
    nombre,
    Descripcion,
    apellido,
    direccion,
    dni,
    email,
    imagen,
    precio,
    telefono,
    titulo,
    Especialidads,
    ObraSocials,
  } = doctorDetail1;
  const { socialSecurity, specialties, fetchUtilities } = useContext(UtilitiesContext);
  const { putDoctor, doctorDetail, fetchDoctorByEmail } = useContext(Context)[0];
  const [loading, setLoading] = useState(true);
  const [openEspecialidades, setOpenEspecialidades] = useState(false);
  const [espe, setEspe] = useState(true);
  const [openObrasSociales, setOpenObrasSociales] = useState(false);
  const [os, setOs] = useState(true);
  const [openImagen, setOpenImagen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [files64, setFiles64] = useState();
  const [fileSize, setFileSize] = useState();
  const [alert, setAlert] = useState(false);
  const [snack, setSnack] = useState(false);
  const [snackFail, setSnackFail] = useState(false);
  const { vista, setVista } = useContext(Context)[3];
  let respuesta = 0;
  useEffect(() => {
    if (!socialSecurity.length && !specialties.length) {
      const search = async () => {
        await fetchUtilities();
      };
      search();
    } else {
      setLoading(false);
    }
  }, [loading, socialSecurity, specialties]);

  useEffect(() => {
    if (vista === 1) {
      const search = async () => {
        await fetchDoctorByEmail(session.email);
      };
      search();
    }
  }, [snack]);

  //console.log(doctorDetail1);

  const [datos, setDatos] = useState({
    id: id,
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    dni: dni,
    email: email,
    prevImagen: imagen,
    oldImagen: imagen,
    imagen: imagen,
    precio: precio,
    telefono: telefono,
    titulo: titulo,
    oldEspecialidades: Especialidads,
    especialidades: Especialidads,
    oldObrasSociales: ObraSocials,
    obrasSociales: ObraSocials,
    Descripcion: Descripcion,
  });
  const [error, setError] = useState({
    nombre: true,
    apellido: true,
    dni: true,
    direccion: true,
    telefono: true,
    titulo: true,
    precio: true,
    especialidades: true,
    obrasSociales: true,
    imagen: true,
    Descripcion: true,
  });

  function validarForm(datos) {
    const errors = {};

    if (!datos.nombre) {
      errors.nombre = 'El campo nombre es requerido';
    }

    if (!datos.apellido) {
      errors.apellido = 'El campo apellido es requerido';
    }

    if (!datos.telefono) {
      errors.telefono = 'El campo teléfono es requerido';
    }
    if (!/^[0-9]*$/.test(datos.telefono)) {
      errors.telefono = 'Solo números';
    }

    if (!datos.dni) {
      errors.dni = 'El campo número de documento es requerido';
    }

    if (!datos.Descripcion) {
      errors.Descripcion = 'El campo descripción es requerido';
    }

    if (!datos.titulo) {
      errors.titulo = 'El titulo universitario es requerido';
    }
    if (!datos.direccion) {
      errors.direccion = 'La direccion donde atiente es requerido';
    }
    if (!datos.imagen) {
      errors.imagen = 'La foto de la perfil es requerida';
    }
    if (!datos.especialidades) {
      errors.especialidades = 'El campo especialidad es requerido';
    }
    if (!datos.obrasSociales) {
      errors.obrasSociales = 'El campo obra social es requerido';
    }
    if (!datos.precio) {
      errors.precio = 'El precio de la consulta es requerido';
    }
    if (!/^[0-9]*$/.test(datos.precio)) {
      errors.precio = 'Solo números';
    }
    setError(errors);
  }

  let especialidadesString = datos.especialidades.map((esp) => esp.name);
  especialidadesString = especialidadesString.join(', ');

  let obrasSocialesString = datos.obrasSociales.map((esp) => esp.nombre);
  obrasSocialesString = obrasSocialesString.join(', ');

  const handleClick = (event) => {
    const name = event.target.name;
    console.log(name);
    if (name === 'especialidades') {
      setOpenEspecialidades(true);
    }
    if (name === 'obrasSociales') {
      setOpenObrasSociales(true);
    }
    if (name === 'foto') {
      setOpenImagen(true);
    }
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setDatos({
      ...datos,
      [property]: value,
    });
    validarForm({ ...datos, [property]: value });
  };
  const handleEspecialidad = (selectedOptionsE) => {
    const property = 'especialidades';
    const values = selectedOptionsE;
    if (values) setEspe(false);
    setDatos({
      ...datos,
      [property]: values,
    });
    validarForm({ ...datos, [property]: values });
  };

  const handleObrasSociales = (selectedOptionsE) => {
    const property = 'obrasSociales';
    const values = selectedOptionsE;
    console.log(selectedOptionsE);
    if (values) setOs(false);
    setDatos({
      ...datos,
      [property]: values,
    });
    validarForm({ ...datos, [property]: values });
  };

  const handleClose = (event) => {
    const name = event.target.name;
    console.log(name);
    if (name === 'registrarEspecialidades') {
      setOpenEspecialidades(false);
    }
    if (name === 'registrarObrasSociales') {
      setOpenEspecialidades(false);
    }
    if (name === 'documentos') {
      setOpenImagen(false);
    }
    setOpenEspecialidades(false);
    setOpenObrasSociales(false);
    setOpenImagen(false);
    setFileName('');
    setOs(true);
    setEspe(true);
    setFileSize();
    setAlert(false);
  };

  const handleSelectedFile = (event) => {
    setFiles64();
    const file = event.target.files[0];
    // console.log(file);
    setFileName(file?.name);
    setFilesToBase(file);
  };
  const setFilesToBase = (file) => {
    try {
      const reader = new FileReader();
      const property = 'imagen';
      reader.readAsDataURL(file);

      reader.onload = () => {
        let fileSize = reader.result.length;
        fileSize = (fileSize / 1024 / 1024).toFixed(2);
        setFileSize(fileSize);
        if (fileSize > 1) setAlert(true);
        else setAlert(false);
      };

      reader.onloadend = () => {
        const values = reader.result;
        setFiles64(values);
        setDatos({
          ...datos,
          [property]: values,
        });
        validarForm({ ...datos, [property]: values });
      };
    } catch (error) {
      return;
    }
  };

  const handleSubmit = async () => {
    console.log(datos);
    try {
      const result = await putDoctor({...datos, status: 'active'});
      console.log(result);
      setSnack(true);
    } catch (error) {
      setSnackFail(false);
    }
  };

  if (loading) return <Loading />;
  else {
    return (
      <>
        <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)}>
          <Alert severity="success" variant="filled">
            <AlertTitle>Mensaje Exitoso</AlertTitle>
            Los cambios de su Perfil han sido suscriptos
          </Alert>
        </Snackbar>
        <Snackbar open={snackFail} autoHideDuration={1500} onClose={() => setSnackFail(false)}>
          <Alert severity="error" variant="filled">
            <AlertTitle>Mensaje de Error</AlertTitle>
            No se han podido publicar los Cambios
          </Alert>
        </Snackbar>
        <Stack alignItems="center">
          {status === 'incomplete' && (
            <Typography sx={{ fontSize: 20 }}>DEBES COMPLETAR TODOS LOS DATOS</Typography>
          )}
          <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: '15px' }}>
            Editar los datos de Perfil
          </Typography>
          <Stack direction="row" spacing={5} justifyContent="space-around">
            <Stack>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Nombre:</Typography>
                <TextField
                  size="small"
                  value={datos.nombre}
                  name="nombre"
                  onChange={handleChange}
                  helperText={
                    error.nombre ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.nombre}
                      </Typography>
                    ) : null
                  }
                ></TextField>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Apellido:</Typography>
                <TextField
                  size="small"
                  value={datos.apellido}
                  name="apellido"
                  onChange={handleChange}
                  helperText={
                    error.apellido ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.apellido}
                      </Typography>
                    ) : null
                  }
                ></TextField>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>D.N.I.:</Typography>
                <TextField
                  size="small"
                  value={datos.dni}
                  name="dni"
                  onChange={handleChange}
                  helperText={
                    error.dni ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.dni}
                      </Typography>
                    ) : null
                  }
                ></TextField>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Dirección:</Typography>
                <TextField
                  size="small"
                  value={datos.direccion}
                  name="direccion"
                  onChange={handleChange}
                  helperText={
                    error.direccion ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.direccion}
                      </Typography>
                    ) : null
                  }
                ></TextField>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Email:</Typography>
                <TextField size="small" value={datos.email} name="email" disabled></TextField>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Teléfono:</Typography>
                <TextField
                  size="small"
                  value={datos.telefono}
                  name="telefono"
                  onChange={handleChange}
                  helperText={
                    error.telefono ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.telefono}
                      </Typography>
                    ) : null
                  }
                ></TextField>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Título:</Typography>
                <TextField
                  size="small"
                  value={datos.titulo}
                  name="titulo"
                  onChange={handleChange}
                  helperText={
                    error.titulo ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.titulo}
                      </Typography>
                    ) : null
                  }
                ></TextField>
              </Box>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Valor de Consulta:</Typography>
                <TextField
                  size="small"
                  value={datos.precio}
                  name="precio"
                  onChange={handleChange}
                  helperText={
                    error.precio ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.precio}
                      </Typography>
                    ) : null
                  }
                ></TextField>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Especialidades:</Typography>
                <TextField
                  size="small"
                  value={especialidadesString}
                  disabled
                  helperText={
                    error.especialidades ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.especialidades}
                      </Typography>
                    ) : null
                  }
                ></TextField>
                <Button
                  onClick={handleClick}
                  name="especialidades"
                  color="secondary"
                  variant="contained"
                  sx={{ ml: '10px' }}
                  size="small"
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Obras Sociales:</Typography>
                <TextField
                  size="small"
                  value={obrasSocialesString}
                  disabled
                  helperText={
                    error.obrasSociales ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.obrasSociales}
                      </Typography>
                    ) : null
                  }
                ></TextField>
                <Button
                  onClick={handleClick}
                  name="obrasSociales"
                  color="secondary"
                  variant="contained"
                  sx={{ ml: '10px' }}
                  size="small"
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Imagen:</Typography>
                <Avatar
                  alt={`${datos.nombre} ${datos.apellido}`}
                  src={datos.imagen}
                  sx={{ width: 80, height: 80 }}
                />
                <Button
                  onClick={handleClick}
                  name="foto"
                  color="secondary"
                  variant="contained"
                  sx={{ ml: '10px' }}
                  size="small"
                  startIcon={<AddAPhotoIcon />}
                >
                  Editar Foto
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                <Typography sx={{ mr: '10px', width: '150px' }}>Descripción:</Typography>
                <TextField
                  value={datos.Descripcion}
                  name="Descripcion"
                  onChange={handleChange}
                  multiline
                  fullWidth
                  rows={3}
                  helperText={
                    error.Descripcion ? (
                      <Typography variant="inherit" color="error" style={{ maxWidth: '200px' }}>
                        {error.Descripcion}
                      </Typography>
                    ) : null
                  }
                ></TextField>
              </Box>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: '200px', mt: '30px', mr: '80px' }}
            onClick={handleSubmit}
            
            disabled={
              (error.nombre ||
                error.apellido ||
                error.dni ||
                error.direccion ||
                error.telefono ||
                error.titulo ||
                error.precio ||
                error.especialidades ||
                error.obrasSociales ||
                error.imagen ||
                error.Descripcion) &&
              true
            }
 
          >
            Guardar Cambios
          </Button>
        </Stack>
        <Dialog open={openEspecialidades} onClose={handleClose} fullWidth="true">
          <DialogTitle>Editar Especialidades</DialogTitle>
          <DialogContent
            sx={{ height: '200px', display: 'flex', alignItems: 'top', justifyContent: 'center' }}
          >
            <DialogContentText sx={{ m: '20px 30px 0 0' }}>
              Seleccione Especialidades:
            </DialogContentText>
            <Autocomplete
              multiple
              sx={{
                width: 240,
              }}
              disablePortal
              id="obra social"
              name="obra social"
              options={specialties}
              getOptionLabel={(option) => {
                return option.name;
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  {...params}
                  label="Especialidad"
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              onClick={handleClose}
              name="registrarEspecialidades"
              variant="contained"
              disabled={espe}
            >
              Registrar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openObrasSociales} onClose={handleClose} fullWidth="true">
          <DialogTitle>Editar Obras Sociales</DialogTitle>
          <DialogContent
            sx={{ height: '200px', display: 'flex', alignItems: 'top', justifyContent: 'center' }}
          >
            <DialogContentText sx={{ m: '20px 30px 0 0' }}>
              Seleccione Obras Sociales:
            </DialogContentText>
            <Autocomplete
              multiple
              sx={{
                width: 240,
              }}
              disablePortal
              id="especialidad"
              name="especialidad"
              options={socialSecurity}
              getOptionLabel={(option) => {
                return option.nombre;
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ bgcolor: 'white', borderRadius: '4px' }}
                  {...params}
                  label="Obras Sociales"
                />
              )}
              renderOption={(props, option) => (
                <li
                  style={{ fontSize: '14px' }}
                  {...props}
                  key={option.id}
                  id={option.id}
                  value={option.nombre}
                >
                  {option.nombre}
                </li>
              )}
              onChange={(selectedOptionsE, value) => handleObrasSociales(value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              onClick={handleClose}
              name="registrarObrasSociales"
              variant="contained"
              disabled={os}
            >
              Registrar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openImagen} onClose={handleClose}>
          <DialogTitle>Actualizar Imagen de Perfil</DialogTitle>
          <DialogContentText sx={{ p: '0 10px 0 10px', m: '0 auto 0' }}>
            Seleccione el archivo a subir
          </DialogContentText>
          <DialogContentText sx={{ p: '0 10px 0 10px', m: '0 auto 10px' }}>
            (solo formato imagen)
          </DialogContentText>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="archivos"
              name="archivos"
              onChange={handleSelectedFile}
            />
            <label htmlFor="archivos">
              <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
                Archivo
              </Button>
            </label>
          </Box>
          <Typography sx={{ ml: '2%', mb: '10px' }}>{fileName}</Typography>
          <Typography sx={{ ml: '2%', mb: '10px' }}>
            {fileSize ? `size: ${fileSize} mb` : null}
          </Typography>
          <Typography sx={{ ml: '2%', mb: '10px', color: 'red' }}>
            {alert ? 'El archivo debe tener menos de 1mb' : null}
          </Typography>

          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              name="documentos"
              variant="contained"
              onClick={handleClose}
              disabled={fileName ? (alert ? true : false) : true}
            >
              Registrar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
};
export default EditarPerfil;
