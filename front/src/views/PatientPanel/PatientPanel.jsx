import { useEffect, useContext, useState } from 'react';
// import { Link, useParams} from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableHead,
  TableRow,
  TableBody,
  Table,
  TableCell,
  Typography,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import { Context } from '../../context/ContextProvider';
import NavBar from '../../components/NavBar/NavBar';
import Loading from '../../components/Loading/Loading';
import Footer from '../../components/Footer/Footer';

import panel41 from '../../assets/Img/panel41.jpg';

const PatientPanel = () => {
  const [loading, setLoading] = useState(true);
  const { patientDetail, fetchPatientByEmail } = useContext(Context)[1];
  const { session } = useContext(Context)[2];

  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [numRows, setNumRows] = useState(3); // Inicia con 3 filas
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [hasResults, setHasResults] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);

  const message = 'No hay resultados para esta búsqueda, toque Restaurar';

  const handleShowMoreClick = () => {
    setNumRows(numRows + 3); // Agrega 3 filas más
  };

  const handleSearch = () => {
    // Lógica de búsqueda aquí
    // Actualizar `hasResults` a `true` o `false` según corresponda
    setHasResults(false);
  };

  const turnos = [
    {
      id: 1,
      fecha: '2022-06-10',
      hora: '10:00',
      especialidad: 'Cardiología',
      médico: 'Dr. Juan Pérez',
      consultorio: 'Consultorio 3',
      dirección: 'Av. Rivadavia 1234',
    },
    {
      id: 2,
      fecha: '2022-06-15',
      hora: '15:30',
      especialidad: 'Dermatología',
      médico: 'Dra. Ana González',
      consultorio: 'Consultorio 2',
      dirección: 'Av. Belgrano 4321',
    },
    {
      id: 3,
      fecha: '2022-06-20',
      hora: '11:15',
      especialidad: 'Pediatría',
      médico: 'Dr. Carlos Ruiz',
      consultorio: 'Consultorio 1',
      dirección: 'Virtual',
    },
    {
      id: 4,
      fecha: '2022-06-20',
      hora: '15:00',
      especialidad: 'Pediatría',
      médico: 'Dr. Alberto Gomez',
      consultorio: 'Consultorio 1',
      dirección: 'Av. Corrientes 5678',
    },
    {
      id: 5,
      fecha: '2022-06-20',
      hora: '19:45',
      especialidad: 'Oftalmologia',
      médico: 'Dr. Paez Carlos',
      consultorio: 'Consultorio 1',
      dirección: 'Av. Corrientes 5678',
    },
    {
      id: 6,
      fecha: '2022-06-10',
      hora: '10:00',
      especialidad: 'Cardiología',
      médico: 'Dr. Juan Pérez',
      consultorio: 'Consultorio 3',
      dirección: 'Av. Rivadavia 1234',
    },
    {
      id: 7,
      fecha: '2022-06-15',
      hora: '15:30',
      especialidad: 'Dermatología',
      médico: 'Dra. Ana González',
      consultorio: 'Consultorio 2',
      dirección: 'Av. Belgrano 4321',
    },
    {
      id: 8,
      fecha: '2022-06-20',
      hora: '11:15',
      especialidad: 'Pediatría',
      médico: 'Dr. Carlos Ruiz',
      consultorio: 'Consultorio 1',
      dirección: 'Virtual',
    },
    {
      id: 9,
      fecha: '2022-06-20',
      hora: '15:00',
      especialidad: 'Pediatría',
      médico: 'Dr. Alberto Gomez',
      consultorio: 'Consultorio 1',
      dirección: 'Av. Corrientes 5678',
    },
    {
      id: 10,
      fecha: '2022-06-20',
      hora: '19:45',
      especialidad: 'Oftalmologia',
      médico: 'Dr. Paez Carlos',
      consultorio: 'Consultorio 1',
      dirección: 'Av. Corrientes 5678',
    },
  ];

  const filteredTurnos = turnos.filter((turno) => {
    if (selectedSpecialty === null) {
      return true; // Si no se ha seleccionado una especialidad, mostrar todos los turnos
    } else {
      return turno.especialidad === selectedSpecialty; // Mostrar los turnos de la especialidad seleccionada
    }
  });

  //
  useEffect(() => {
    console.log('*** RENDER ***');
    console.log(session, '****');
    fetchPatientByEmail(session.email);
  }, []);

  useEffect(() => {
    patientDetail.id && setLoading(false) 
    console.log(patientDetail) 
    console.log(patientDetail.email) 
  }, [patientDetail]);
  
  if(loading){
    return <Loading></Loading>
  }

  return (
    <>
      
      <NavBar text={"Mi Cuenta:"} type={patientDetail}/>
      <Box
        sx={{
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
      ></Box>
      <Container
        maxWidth="lg"
        sx={{
          minWidth: '300px',
          width: '80%',
          // padding: "15px",
          marginTop: '20%',
          // marginBottom: "3%",
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
        <Box
          m={2}
          p={3}
          boxShadow={3}
          borderRadius={2}
          backgroundColor="#c8e6c9"
          sx={{ mb: '20%' }}
        >
          <h2>Mis turnos</h2>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1%', mb: '7%' }}>
            <FormControl sx={{ minWidth: 120, mr: '5%' }}>
              <InputLabel id="specialty-select-label">Especialidad</InputLabel>
              <Select
                labelId="specialty-select-label"
                id="specialty-select"
                value={selectedSpecialty}
                label="Especialidad"
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                sx={{ minWidth: '260px' }}
              >
                <MenuItem value={null}>Todas</MenuItem>
                <MenuItem value="Cardiología">Cardiología</MenuItem>
                <MenuItem value="Dermatología">Dermatología</MenuItem>
                <MenuItem value="Pediatría">Pediatría</MenuItem>
                <MenuItem value="Oftalmologia">Oftalmología</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120, ml: '5%', mr: '3%' }}>
              <InputLabel id="specialty-select-label">Dirección</InputLabel>
              <Select
                labelId="direction-select-label"
                id="direction-select"
                value={selectedDirection}
                label="Dirección"
                onChange={(e) => setSelectedDirection(e.target.value)}
                sx={{ minWidth: '260px' }}
              >
                <MenuItem value={null}>Todas</MenuItem>
                <MenuItem value="Virtual">Virtual</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={() => {
                setSelectedSpecialty(null);
                setSelectedDirection(null);
              }}
              sx={{ gap: 1.3 }}
            >
              <SettingsBackupRestoreIcon />
              Restaurar
            </Button>
          </Box>

          <Box>
            <Table>
              <TableHead>
                {turnos?.filter(
                  (turno) =>
                    (turno.especialidad === selectedSpecialty || selectedSpecialty === null) &&
                    (turno.dirección === selectedDirection || selectedDirection === null)
                ).length === 0 && (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ display: 'flex', justifyContent: 'center', ml: '20%', mb: '10%' }}
                    >
                      No hay resultados para esta búsqueda, toque Restaurar
                    </Typography>
                  </Box>
                )}
                <TableRow>
                  <TableCell>Especialidad</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Hora</TableCell>
                  <TableCell>Medico</TableCell>
                  <TableCell>Direccion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {turnos
                  ?.filter(
                    (turno) =>
                      (turno.especialidad === selectedSpecialty || selectedSpecialty === null) &&
                      (turno.dirección === selectedDirection || selectedDirection === null)
                  )
                  .slice(0, numRows)
                  .map((turno) => (
                    <TableRow key={turno.id}>
                      <TableCell>{turno.especialidad}</TableCell>
                      <TableCell>{turno.fecha}</TableCell>
                      <TableCell>{turno.hora}</TableCell>
                      <TableCell>{turno.médico}</TableCell>
                      <TableCell>{turno.dirección}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Button variant="contained" sx={{ margin: '10px' }} onClick={handleShowMoreClick}>
              Mostrar más
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PatientPanel;
