import { useState, useContext, useEffect } from "react";
import { Context } from '../../context/ContextProvider';

import { Divider, ListItem } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { fontWeight } from "@mui/system";


const HistorialPaciente = () => {
    const {pacienteHistorial, setVista} = useContext(Context)[3];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pacienteHistorial){
          setLoading(false);
        }
        console.log(pacienteHistorial);
    }, [loading, pacienteHistorial]);

    const handleClickBack = async (event) =>{
        setVista(6)
    }

    const handleClick = (event)=>{
        console.log(event.target);
    }
    return ( 
        <>
            <Box style={{display:"flex", flexDirection:"row", justifyContent:"center", padding:"0px 0 10px 0"}}>
                <Typography style={{fontSize:"larger", fontWeight:"600"}}>Historial Médico del Paciente</Typography>
            </Box>
            <Divider/>
            <List style={{display: "flex", flexDirection:"row", padding: 0, justifyContent:"center", alignItems:"center"}}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary="Nombre y Apellido" primary={`${pacienteHistorial.paciente.nombre} ${pacienteHistorial.paciente.apellido}`}/>
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar>
                            <PhoneIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary="Telefono" primary={`${pacienteHistorial.paciente.telefono}`}/>
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar>
                            <EmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary="Correo Electrónico" primary={`${pacienteHistorial.paciente.email}`}/>
                </ListItem>
            </List>
            <Divider/>
            <Box style={{display:"flex", flexDirection:"row", justifyContent:"center", padding:"20px 0 20px 0"}}>
                <Button onClick={handleClickBack} style={{width:"200px"}} variant="outlined" size="small">Volver a Pacientes</Button>
            </Box>
            <Divider/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={{ backgroundColor: "lightgray", position: "sticky", top: 0, zIndex:1 }}>
                        <TableRow>
                            <TableCell key="nombre" align="center">Fecha</TableCell>
                            <TableCell key="apellido" align="center">Hora</TableCell>
                            <TableCell align="center">Nota del Paciente</TableCell>
                            <TableCell align="center">Devolución del Medico</TableCell>
                            <TableCell align="center">Documentos Relacionados</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {pacienteHistorial.citas.map(cita => (
                                <TableRow>
                                    <TableCell align="center">{cita.fecha}</TableCell>
                                    <TableCell align="center">{cita.hora}</TableCell>
                                    <TableCell align="center">{cita.descripcion}</TableCell>
                                    <TableCell align="center">{cita.respuestaMedico}</TableCell>
                                    <TableCell align="center">Documentos</TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            id={pacienteHistorial.paciente.id} 
                                            onClick={handleClick} 
                                            variant="outlined" 
                                            size="small" 
                                            disabled={cita.respuestaMedico!== null && true}
                                        >
                                            Dar Respuesta
                                        </Button>
                                        <Button 
                                            id={pacienteHistorial.paciente.id} 
                                            onClick={handleClick} 
                                            variant="outlined" 
                                            size="small" 
                                            disabled={cita.respuestaMedico!== null && true}
                                            sx={{ml:"10px"}}
                                        >
                                            Subir Documentos
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default HistorialPaciente