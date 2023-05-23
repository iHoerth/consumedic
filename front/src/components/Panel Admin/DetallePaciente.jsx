import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import ConfigAgenda from "../../components/DoctorDashboard/ConfigAgenda";
import Profile from "../../components/DoctorDashboard/Profile/Profile";
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
import { Stack, Divider, Typography, Button, ListItem } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ListItemButton from "@mui/material/ListItemButton";

import HistorialPaciente from "../../components/DoctorDashboard/HistorialPaciente";
import Turnos from "../../components/DoctorDashboard/Turnos";
import EditarPerfil from "../../components/DoctorDashboard/EditarPerfil";
import PatientData from "../PatientPanel/PatientData/PatientData";

const DetallePaciente = () => {
  const theme = useTheme();
  const { session } = useContext(Context)[2];
  
  const {  patientDetail, fetchPatientByEmail } = useContext(Context)[1];

  const { setVista, email } = useContext(Context)[6];

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(!patientDetail){

        fetchPatientByEmail(email);
        console.log(patientDetail);
    }
    else{
        setLoading(false)
    }
    console.log(patientDetail);
    
  }, [patientDetail]);




  return (
    <>
        <List style={{display: "flex", flexDirection:"column", padding: 0, justifyContent:"center", alignItems:"center"}}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary="Nombre y Apellido" primary={`${patientDetail.nombre} ${patientDetail.apellido}`}/>
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar>
                            <PhoneIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary="Telefono" primary={`${patientDetail.telefono}`}/>
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar>
                            <EmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary="Correo Electrónico" primary={`${patientDetail.email}`}/>
                </ListItem>
            </List>
    </>
  );
};

export default DetallePaciente;