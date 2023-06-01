import { useState, useContext, useEffect } from "react";
import { Context } from '../../context/ContextProvider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from "@mui/icons-material/Search";
import { Button, Box, Typography, Divider, TextField } from '@mui/material';



const Pacientes = ({id}) => {
    const { pacientes, pacienteHistorial, fetchPacientes, fetchPacienteHistorial,setVista} = useContext(Context)[3];
    const {fetchPatientById } = useContext(Context)[1];
    const {fetchDoctorById} = useContext(Context)[0];
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [fetched, setfetched] = useState(false);

    useEffect(() => {
          const search = async () => {
            await fetchPacientes(id)
          }
          search()
    }, []);
    useEffect(() => {
        if (pacientes.length === 0 && !fetched) {
          fetchPacientes();
          setfetched(true);
        } else {
          setLoading(false);
        }
      }, [pacientes]);
    useEffect(() => {
    const filtered = pacientes.filter((paciente) =>
        (paciente.nombre+" "+paciente.apellido).toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
    }, [searchQuery, pacientes]);
    


    const handleClick = async (event) =>{
        const idPaciente = Number(event.target.id);
        const idMedico = id
        await fetchPacienteHistorial(idMedico,idPaciente)
        await fetchPatientById(idPaciente)
        await fetchDoctorById(idMedico)
        setVista(10)
    }
    
    return ( 
        <>
            <Box style={{display:"flex", flexDirection:"row", justifyContent:"space-around", padding:"0px 0 10px 0"}}>
                <Typography style={{fontSize:"larger", fontWeight:"600"}}>Listado de Pacientes</Typography>
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: "0px",
                    }}
                    >
                    <TextField
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por nombre"
                        size="small"
                        sx={{
                        border: "2px solid white",
                        borderRadius: "3px",
                        color: "white",
                        }}
                        InputProps={{
                        endAdornment: <SearchIcon sx={{ color: "gray" }} />,
                        }}
                    />
                    </Box>
            </Box>
            <Divider />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={{ backgroundColor: "lightgray", position: "sticky", top: 0, zIndex:1 }}>
                        <TableRow>
                            <TableCell key="nombre" align="left">Nombre y Apellido</TableCell>
                            {/* <TableCell key="apellido" align="center">Apellido</TableCell> */}
                            <TableCell align="center">DNI</TableCell>
                            <TableCell align="center">Telefono</TableCell>
                            <TableCell align="center">Correo</TableCell>
                            <TableCell align="center">Historial</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            { !filteredPatients?.length ? "No hay pacientes para mostrar"
                             : filteredPatients.map(paciente => (
                                <TableRow>
                                    <TableCell align="left">{paciente.nombre} {paciente.apellido}</TableCell>
                                    {/* <TableCell align="center">{paciente.apellido}</TableCell> */}
                                    <TableCell align="center">{paciente.dni}</TableCell>
                                    <TableCell align="center">{paciente.telefono}</TableCell>
                                    <TableCell align="center">{paciente.email}</TableCell>
                                    <TableCell align="center"><Button id={paciente.id} onClick={handleClick}  color="secondary" variant="outlined" size="small" >Ver Historial</Button></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default Pacientes

