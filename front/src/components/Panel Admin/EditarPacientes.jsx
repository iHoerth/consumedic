import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import ConfigAgenda from "../../components/DoctorDashboard/ConfigAgenda";
import Pacientes from "../../components/DoctorDashboard/Pacientes";
import { useTheme } from "@mui/material";

import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Stack, Divider, Typography, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HistorialPaciente from "../../components/DoctorDashboard/HistorialPaciente";
import Turnos from "../../components/DoctorDashboard/Turnos";
import EditarPerfil from "../../components/DoctorDashboard/EditarPerfil";

const EditarPacientes = () => {
  const theme = useTheme();
  const { session } = useContext(Context)[2];
  
  const { doctors, doctorDetail, fetchDoctors, fetchDoctorById } = useContext(Context)[0];
  const { patients, patientDetail, fetchPatients, fetchPatientByEmail } = useContext(Context)[1];

  const { setVista, setEmail } = useContext(Context)[6];



  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(patients.length===0){
        fetchPatients();
    }
    else{

        setLoading(false)
    }
    console.log(patients);
  }, [patients]);


 const handleClick = (event) => {
    console.log(event.target.id);
    fetchPatientByEmail(event.target.id)
    setEmail(event.target.id)
    setVista(10)
 }


  return (
    <>
        <Box style={{display:"flex", flexDirection:"row", justifyContent:"center", padding:"0px 0 10px 0"}}>
                <Typography style={{fontSize:"larger", fontWeight:"600"}}>Listado de Pacientes</Typography>
            </Box>
            <Divider />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={{ backgroundColor: "lightgray", position: "sticky", top: 0, zIndex:1 }}>
                        <TableRow>
                            <TableCell key="nombre" align="left">Nombre y Apellido</TableCell>
                            {/* <TableCell key="apellido" align="center">Apellido</TableCell> */}
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Telefono</TableCell>
                            <TableCell align="center">Ver Detalle</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            { patients.map(paciente => (
                                <TableRow>
                                    <TableCell align="left">{paciente.nombre} {paciente.apellido}</TableCell>
                                    <TableCell align="center">{paciente.email}</TableCell>
                                    <TableCell align="center">{paciente.id}</TableCell>
                                    <TableCell align="center">{paciente.telefono}</TableCell>
                                    <TableCell align="center"><Button id={paciente.email} onClick={handleClick} variant="outlined" size="small" >Acceder</Button></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </>
  );
};

export default EditarPacientes;
