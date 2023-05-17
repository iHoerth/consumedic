// import * as React from 'react';
// import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
// import Divider from '@mui/material/Divider';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import ArrowRight from '@mui/icons-material/ArrowRight';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
// import Home from '@mui/icons-material/Home';
// import Settings from '@mui/icons-material/Settings';
// import People from '@mui/icons-material/People';
// import PermMedia from '@mui/icons-material/PermMedia';
// import Dns from '@mui/icons-material/Dns';
// import Public from '@mui/icons-material/Public';

// import { Container, Box, Paper, Button, TableHead, TableRow, TableBody, Table, TableCell } from '@mui/material'
// import NavBar from '../../components/NavBar/NavBar';
// import { Link } from 'react-router-dom';
// import panelPatient from '../../assets/Img/panelPatient.jpg'
// import Footer from '../../components/Footer/Footer';



// const turnos = [
//   {
//     id: 1,
//     fecha: "2022-06-10",
//     hora: "10:00",
//     especialidad: "Cardiología",
//     médico: "Dr. Juan Pérez",
//     consultorio: "Consultorio 3",
//     dirección: "Av. Rivadavia 1234"
//   },
//   {
//     id: 2,
//     fecha: "2022-06-15",
//     hora: "15:30",
//     especialidad: "Dermatología",
//     médico: "Dra. Ana González",
//     consultorio: "Consultorio 2",
//     dirección: "Av. Belgrano 4321"
//   },
//   {
//     id: 3,
//     fecha: "2022-06-20",
//     hora: "11:15",
//     especialidad: "Pediatría",
//     médico: "Dr. Carlos Ruiz",
//     consultorio: "Consultorio 1",
//     dirección: "Virtual"
//   },
//   {
//     id: 4,
//     fecha: "2022-06-20",
//     hora: "15:00",
//     especialidad: "Pediatría",
//     médico: "Dr. Alberto Gomez",
//     consultorio: "Consultorio 1",
//     dirección: "Av. Corrientes 5678"
//   },
//   {
//     id: 5,
//     fecha: "2022-06-20",
//     hora: "19:45",
//     especialidad: "Oftalmologia",
//     médico: "Dr. Paez Carlos",
//     consultorio: "Consultorio 1",
//     dirección: "Av. Corrientes 5678"
//   }
// ];


// const estudios = [
//   {
//     id: 1,
//     nombre: "Hemograma completo",
//     tipo: "Análisis de sangre",
//     descripcion: "El hemograma completo es un análisis de sangre que evalúa la cantidad y calidad de las células sanguíneas.",
//     fecha: "2022-03-15",
//     resultado: "Los valores se encuentran dentro de los límites normales."
//   },
//   {
//     id: 2,
//     nombre: "Radiografía de tórax",
//     tipo: "Estudio de imágenes",
//     descripcion: "La radiografía de tórax es una técnica de diagnóstico por imágenes que permite visualizar la estructura y el estado de los pulmones y otras estructuras torácicas.",
//     fecha: "2022-04-10",
//     resultado: "Se observa una leve opacidad en el lóbulo inferior del pulmón derecho. Se sugiere repetir el estudio en dos semanas."
//   },
//   {
//     id: 3,
//     nombre: "Electrocardiograma",
//     tipo: "Estudio de electrofisiología cardíaca",
//     descripcion: "El electrocardiograma (ECG) es una prueba no invasiva que registra la actividad eléctrica del corazón a través de electrodos colocados en la piel.",
//     fecha: "2022-05-05",
//     resultado: "El ECG muestra una actividad eléctrica del corazón normal, sin signos de arritmias ni alteraciones del ritmo cardíaco."
//   }
// ]

// const data = [
//   { icon: <People />, label: 'Authentication' },
//   { icon: <Dns />, label: 'Database' },
//   { icon: <PermMedia />, label: 'Storage' },
//   { icon: <Public />, label: 'Hosting' },
// ];

// const FireNav = styled(List)({
//   '& .MuiListItemButton-root': {
//     paddingLeft: 24,
//     paddingRight: 24,
//   },
//   '& .MuiListItemIcon-root': {
//     minWidth: 0,
//     marginRight: 16,
//   },
//   '& .MuiSvgIcon-root': {
//     fontSize: 20,
//   },
// });

// export default function CustomizedList() {
//   const [open, setOpen] = React.useState(true);
//   return (
//     <>
//     <NavBar/>
//       <Box
//         sx={{
//           backgroundImage: `url('${panelPatient}')`,
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundAttachment: "fixed",
//           position: "relative",
//           width: "100%",
//           // height: "100%",
//           display: 'flex',
//           flexDirection: "column",
//           alignItems: 'center',
//           height: { xs: '50vh', sm: '60vh', md: '70vh', lg: '80vh' },
//           '@media (max-width: 600px)': {
//             height: {
//               xs: '50vh',
//               sm: '60vh',
//               md: '70vh',
//               lg: '80vh',
//             }
//           }, 
//         }}
//     >


//       <Container 
//         component={Paper} 
//         elevation={5} 
//         maxWidth="lg" 
//         sx={{ 
//           display: 'flex', 
//           minWidth: "300px", 
//           width: "80%", 
//           // padding: "15px",
//           marginTop: "10%",
//           // marginBottom: "3%",
//           height: { xs: '50vh', sm: '60vh', md: '70vh', lg: '80vh' },
//           '@media (max-width: 600px)': {
//             height: {
//               xs: '50vh',
//               sm: '60vh',
//               md: '70vh',
//               lg: '80vh',
//             }
//           }, 
//         }}
//         >
//           <Box 
//             sx={{
//               // transform: 'rotate(90deg)',
//               overflow: 'auto',
//               margin: '0 auto',
//               '@media (min-width: 700px)': {
//                 transform: 'none',
//               }
//             }}
//           >
//           <ThemeProvider
//             theme={createTheme({
//               components: {
//                 MuiListItemButton: {
//                   defaultProps: {
//                     disableTouchRipple: true,
//                   },
//                 },
//               },
//               palette: {
//                 mode: 'dark',
//                 primary: { main: 'rgb(102, 157, 246)' },
//                 background: { paper: 'rgb(5, 30, 52)' },
//               },
//             })}
//           >
//             <Paper elevation={0} sx={{ maxWidth: 256 }}>
//               <FireNav component="nav" disablePadding>
//                 <ListItemButton component="a" href="#customized-list">
//                   <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
//                   <ListItemText
//                     sx={{ my: 0 }}
//                     primary="Firebash"
//                     primaryTypographyProps={{
//                       fontSize: 20,
//                       fontWeight: 'medium',
//                       letterSpacing: 0,
//                     }}
//                   />
//                 </ListItemButton>
//                 <Divider />
//                 <ListItem component="div" disablePadding>
//                   <ListItemButton sx={{ height: 56 }}>
//                     <ListItemIcon>
//                       <Home color="primary" />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary="Project Overview"
//                       primaryTypographyProps={{
//                         color: 'primary',
//                         fontWeight: 'medium',
//                         variant: 'body2',
//                       }}
//                     />
//                   </ListItemButton>
//                   <Tooltip title="Project Settings">
//                     <IconButton
//                       size="large"
//                       sx={{
//                         '& svg': {
//                           color: 'rgba(255,255,255,0.8)',
//                           transition: '0.2s',
//                           transform: 'translateX(0) rotate(0)',
//                         },
//                         '&:hover, &:focus': {
//                           bgcolor: 'unset',
//                           '& svg:first-of-type': {
//                             transform: 'translateX(-4px) rotate(-20deg)',
//                           },
//                           '& svg:last-of-type': {
//                             right: 0,
//                             opacity: 1,
//                           },
//                         },
//                         '&:after': {
//                           content: '""',
//                           position: 'absolute',
//                           height: '80%',
//                           display: 'block',
//                           left: 0,
//                           width: '1px',
//                           bgcolor: 'divider',
//                         },
//                       }}
//                     >
//                       <Settings />
//                       <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
//                     </IconButton>
//                   </Tooltip>
//                 </ListItem>
//                 <Divider />
//                 <Box
//                   sx={{
//                     bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
//                     pb: open ? 2 : 0,
//                   }}
//                 >
//                   <ListItemButton
//                     alignItems="flex-start"
//                     onClick={() => setOpen(!open)}
//                     sx={{
//                       px: 3,
//                       pt: 2.5,
//                       pb: open ? 0 : 2.5,
//                       '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
//                     }}
//                   >
//                     <ListItemText
//                       primary="Build"
//                       primaryTypographyProps={{
//                         fontSize: 15,
//                         fontWeight: 'medium',
//                         lineHeight: '20px',
//                         mb: '2px',
//                       }}
//                       secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
//                       secondaryTypographyProps={{
//                         noWrap: true,
//                         fontSize: 12,
//                         lineHeight: '16px',
//                         color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
//                       }}
//                       sx={{ my: 0 }}
//                     />
//                     <KeyboardArrowDown
//                       sx={{
//                         mr: -1,
//                         opacity: 0,
//                         transform: open ? 'rotate(-180deg)' : 'rotate(0)',
//                         transition: '0.2s',
//                       }}
//                     />
//                   </ListItemButton>
//                   {open &&
//                     data.map((item) => (
//                       <ListItemButton
//                         key={item.label}
//                         sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
//                       >
//                         <ListItemIcon sx={{ color: 'inherit' }}>
//                           {item.icon}
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={item.label}
//                           primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
//                         />
//                       </ListItemButton>
//                     ))}
//                 </Box>
//               </FireNav>
//             </Paper>
//           </ThemeProvider>
//         </Box>
//           <Box m={2} p={3}  boxShadow={3}
//             borderRadius={2} sx={{
//               // transform: 'rotate(90deg)',
//               overflow: 'auto',
//               margin: '0 auto',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               '@media (min-width: 700px)': {
//                 transform: 'none',
//               }
//             }}
//           >
//             <h2>Mis turnos</h2>
//             <Box
//             >
//               {/* <Button onClick={detailPatient}>Log detalle paciente</Button> */}
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Especialidad</TableCell>
//                     <TableCell>Fecha</TableCell>
//                     <TableCell>Hora</TableCell>
//                     <TableCell>Medico</TableCell>
//                     <TableCell>Direccion</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {turnos?.map((turno, index) => {
//                     if (index < 3) {
//                       return (
//                         <TableRow key={turno.id}>
//                           <TableCell>{turno.especialidad}</TableCell>
//                           <TableCell>{turno.fecha}</TableCell>
//                           <TableCell>{turno.hora}</TableCell>
//                           <TableCell>{turno.médico}</TableCell>
//                           <TableCell>{turno.dirección}</TableCell>
//                         </TableRow>
//                       );
//                     } else {
//                       return null;
//                     }
//                   })}
//                 </TableBody>
//               </Table>
//             </Box>
//             <Box display='flex' justifyContent='space-around' alignItems='center'>
//               <Button
//                 variant="contained"
//                 sx={{ margin: '10px' }}
//                 component={Link}
//                 to="/patientpanel/:id"
//               >
//                 Todos mis turnos
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{ margin: '10px' }}
//                 component={Link}
//                 to="/search"
//               >
//                 Nuevo turno
//               </Button>
//             </Box>

//           </Box>

//         <Box m={2} p={3} boxShadow={3}
//           borderRadius={2} sx={{
//             // transform: 'rotate(90deg)',
//             overflow: 'auto',
//             margin: '0 auto',
            
//             '@media (min-width: 700px)': {
//               transform: 'none',
//             }
//           }}>
//           <h2>Mis Estudios</h2>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Nombre</TableCell>
//                 <TableCell>Tipo</TableCell>
//                 <TableCell>Fecha</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {estudios?.map((estudio) => {
//                 return (
//                   <TableRow key={estudio.id}>
//                     <TableCell>{estudio.nombre}</TableCell>
//                     <TableCell>{estudio.tipo}</TableCell>
//                     <TableCell>{estudio.fecha}</TableCell>
//                   </TableRow>
//                 )
//               })}
//             </TableBody>
//           </Table>
//         </Box>
//       </Container>
//       <Footer />

//       </Box>

//     </>
//   );
// }


import { Container, Box, Paper, Button, TableHead, TableRow, TableBody, Table, TableCell } from '@mui/material'
import React, { useEffect, useContext } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Context } from '../../context/ContextProvider'
import { Link, useParams} from 'react-router-dom';

import panelPatient from '../../assets/Img/panelPatient.jpg'
import Footer from '../../components/Footer/Footer';


const PatientPanel = () => {
  const { id } = useParams();

  const patient = useContext(Context)[1];
  const {patientDetail} = patient;

  const detailPatient = () => {
    console.log(patientDetail);
  }

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
      dirección: "Virtual"
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

  //

  
  

  return (
    <>
      <NavBar/>
      <Box
        sx={{
          // backgroundImage: `url('/panelPatient/${props.match.params.id}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          position: "relative",
          width: "100%",
          height: "100%",
          display: 'flex',
          flexDirection: "column",
          alignItems: 'center',
          '@media (max-width: 600px)': {
            height: {
              xs: '50vh',
              sm: '60vh',
              md: '70vh',
              lg: '80vh',
            }
          }, 
        }}
    >

    </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          minWidth: "300px", 
          width: "80%", 
          // padding: "15px",
          marginTop: "10%",
          // marginBottom: "3%",
          '@media (max-width: 600px)': {
            height: {
              xs: '50vh',
              sm: '60vh',
              md: '70vh',
              lg: '80vh',
            }
          }, 
        }}
        >
        <Box m={2} p={3}  boxShadow={3}
          borderRadius={2}>
          <h2>Mis turnos</h2>
          <Box>
            {/* <Button onClick={detailPatient}>Log detalle paciente</Button> */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Especialidad</TableCell>
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
                        <TableCell>{turno.especialidad}</TableCell>
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
            <Button
              variant="contained"
              sx={{ margin: '10px' }}
              component={Link}
              to="/patientpanel/:id"
            >
              Todos mis turnos
            </Button>
            <Button
              variant="contained"
              sx={{ margin: '10px' }}
              component={Link}
              to="/search"
            >
              Nuevo turno
            </Button>
          </Box>

        </Box>

        <Box m={2} p={3} boxShadow={3}
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
      <Footer />
    </>

  )
}

export default PatientPanel
