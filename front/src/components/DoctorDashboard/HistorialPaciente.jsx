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
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


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
        // borrarPacienteHistorial();
        setVista(6)
    }

    const handleClick = (event)=>{
        console.log(event.target);
    }
    return ( 
        <>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Nombre y Apellido" secondary={`${pacienteHistorial.paciente.nombre} ${pacienteHistorial.paciente.apellido}`}/>
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar>
                            <PhoneIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Telefono" secondary={`${pacienteHistorial.paciente.telefono}`}/>
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar>
                            <EmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Correo Electrónico" secondary={`${pacienteHistorial.paciente.email}`}/>
                </ListItem>
                <Button onClick={handleClickBack} variant="outlined" size="small">Volver a Pacientes</Button>
            </List>
            <Divider/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell key="nombre" align="center">Fecha</TableCell>
                            <TableCell key="apellido" align="center">Hora</TableCell>
                            <TableCell align="center">Nota del Paciente</TableCell>
                            <TableCell align="center">Devolución del Medico</TableCell>
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
                                    <TableCell align="center"><Button id={pacienteHistorial.paciente.id} onClick={handleClick} variant="outlined" size="small" disabled={cita.respuestaMedico!== null && true}>Dar Respuesta</Button></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default HistorialPaciente