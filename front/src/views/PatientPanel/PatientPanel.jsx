import { Container, Box, Paper, Button, TableHead, TableRow, TableBody, Table, TableCell } from '@mui/material'
import React from 'react'
import NavBar from '../../components/NavBar/NavBar'

const PatientPanel = () => {

  const turnos = [
    {
      id: 1,
      fecha: "2022-06-10",
      hora: "10:00",
      especialidad: "Cardiología",
      médico: "Dr. Juan Pérez",
      consultorio: "Consultorio 3",
      dirección: "Av. Rivadavia 1234"
    },
    {
      id: 2,
      fecha: "2022-06-15",
      hora: "15:30",
      especialidad: "Dermatología",
      médico: "Dra. Ana González",
      consultorio: "Consultorio 2",
      dirección: "Av. Belgrano 4321"
    },
    {
      id: 3,
      fecha: "2022-06-20",
      hora: "11:15",
      especialidad: "Pediatría",
      médico: "Dr. Carlos Ruiz",
      consultorio: "Consultorio 1",
      dirección: "Av. Corrientes 5678"
    },
    {
      id: 4,
      fecha: "2022-06-20",
      hora: "15:00",
      especialidad: "Pediatría",
      médico: "Dr. Alberto Gomez",
      consultorio: "Consultorio 1",
      dirección: "Av. Corrientes 5678"
    },
    {
      id: 5,
      fecha: "2022-06-20",
      hora: "19:45",
      especialidad: "Oftalmologia",
      médico: "Dr. Paez Carlos",
      consultorio: "Consultorio 1",
      dirección: "Av. Corrientes 5678"
    }
  ];


  const estudios = [
    {
      id: 1,
      nombre: "Hemograma completo",
      tipo: "Análisis de sangre",
      descripcion: "El hemograma completo es un análisis de sangre que evalúa la cantidad y calidad de las células sanguíneas.",
      fecha: "2022-03-15",
      resultado: "Los valores se encuentran dentro de los límites normales."
    },
    {
      id: 2,
      nombre: "Radiografía de tórax",
      tipo: "Estudio de imágenes",
      descripcion: "La radiografía de tórax es una técnica de diagnóstico por imágenes que permite visualizar la estructura y el estado de los pulmones y otras estructuras torácicas.",
      fecha: "2022-04-10",
      resultado: "Se observa una leve opacidad en el lóbulo inferior del pulmón derecho. Se sugiere repetir el estudio en dos semanas."
    },
    {
      id: 3,
      nombre: "Electrocardiograma",
      tipo: "Estudio de electrofisiología cardíaca",
      descripcion: "El electrocardiograma (ECG) es una prueba no invasiva que registra la actividad eléctrica del corazón a través de electrodos colocados en la piel.",
      fecha: "2022-05-05",
      resultado: "El ECG muestra una actividad eléctrica del corazón normal, sin signos de arritmias ni alteraciones del ritmo cardíaco."
    }
  ]



  return (
    <>
      <NavBar></NavBar>
      <Container maxWidth="lg" height='200px'>
        <Box m={2} p={3} bgcolor="secondary.main" boxShadow={3}
          borderRadius={2}>
          <h2>Mis turnos</h2>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Hora</TableCell>
                  <TableCell>Medico</TableCell>
                  <TableCell>Direccion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {turnos?.map((turno, index) => {
                  if (index < 3) {
                    return (
                      <TableRow key={turno.id}>
                        <TableCell>{turno.fecha}</TableCell>
                        <TableCell>{turno.hora}</TableCell>
                        <TableCell>{turno.médico}</TableCell>
                        <TableCell>{turno.dirección}</TableCell>
                      </TableRow>
                    );
                  } else {
                    return null;
                  }
                })}
              </TableBody>
            </Table>
          </Box>
          <Box display='flex' justifyContent='space-around' alignItems='center'>
            <Button variant="contained" sx={{ margin: '10px' }}
              href="#" >
              Todos mis turnos
            </Button>
            <Button variant="contained" sx={{ margin: '10px' }}
              href="#" >
              Nuevo turno
            </Button>
          </Box>

        </Box>

        <Box m={2} p={3} bgcolor="secondary.main" boxShadow={3}
          borderRadius={2}>
          <h2>Mis Estudios</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estudios?.map((estudio) => {
                return (
                  <TableRow key={estudio.id}>
                    <TableCell>{estudio.nombre}</TableCell>
                    <TableCell>{estudio.tipo}</TableCell>
                    <TableCell>{estudio.fecha}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>

      </Container>
    </>

  )
}

export default PatientPanel