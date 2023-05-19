import { useState, useContext, useEffect } from "react";
import { Context } from '../../context/ContextProvider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';



const Pacientes = ({id}) => {
    const { pacientes, pacienteHistorial, fetchPacientes, fetchPacienteHistorial,setVista} = useContext(Context)[3];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pacientes.length) {
          const search = async () => {
            await fetchPacientes(id)
          }
          search()
        }
        else{
          setLoading(false);
        }
        console.log(pacienteHistorial);
    }, [loading, pacientes]);


    const handleClick = async (event) =>{
        const idPaciente = Number(event.target.id);
        const idMedico = id
        await fetchPacienteHistorial(idMedico,idPaciente)
        setVista(10)
    }
    
    return ( 
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell key="nombre" align="center">Nombre</TableCell>
                            <TableCell key="apellido" align="center">Apellido</TableCell>
                            <TableCell align="center">DNI</TableCell>
                            <TableCell align="center">Obra Social</TableCell>
                            <TableCell align="center">Telefono</TableCell>
                            <TableCell align="center">Correo</TableCell>
                            <TableCell align="center">Historial</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            { pacientes.map(paciente => (
                                <TableRow>
                                    <TableCell align="center">{paciente.nombre}</TableCell>
                                    <TableCell align="center">{paciente.apellido}</TableCell>
                                    <TableCell align="center">{paciente.dni}</TableCell>
                                    <TableCell align="center">{paciente.ObraSocialId.nombre}</TableCell>
                                    <TableCell align="center">{paciente.telefono}</TableCell>
                                    <TableCell align="center">{paciente.email}</TableCell>
                                    <TableCell align="center"><Button id={paciente.id} onClick={handleClick} variant="outlined" size="small" >Ver Historial</Button></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default Pacientes

