import { useState, useContext, useEffect } from "react";
import { Context } from '../../context/ContextProvider';

import { Divider, ListItem, TextField } from "@mui/material";
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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PhotoCamera from "@mui/icons-material/PhotoCamera";


const HistorialPaciente = () => {
    const {pacienteHistorial, setVista, postDocumentosCita, postRespuestaCita,fetchPacienteHistorial} = useContext(Context)[3];
    const [loading, setLoading] = useState(true);
    const [openResponse, setOpenResponse] = useState(false)
    const [openDocuments, setOpenDocuments] = useState(false)
    const [openImage, setOpenImage] = useState(false)
    const [imagen, setImagen] = useState("")
    const [fileName, setFileName] = useState("")
    const [title, setTitle] = useState("")


    const [files64, setFiles64]=useState()
    const [respuesta, setRespuesta]=useState()
    const [currentCita,setCurrentCita]=useState(0)

    useEffect(() => {
        if (pacienteHistorial){
          setLoading(false);
        }
        console.log(pacienteHistorial);
    }, [loading, pacienteHistorial]);

    useEffect(() => {
        fetchPacienteHistorial(pacienteHistorial.citas[0].DoctorTypeId, pacienteHistorial.citas[0].PacienteTypeId)
    }, [openResponse,openDocuments, imagen, files64]);

    const handleClickBack = async () =>{
        setVista(6) 
    }

    const handleClickOpen = (event)=>{
        console.log(event.target.id);
        console.log(event.target.name);
        if(event.target.name!=="documentos"){
            setOpenResponse(true)
        }
        else{
            setRespuesta()
            setOpenDocuments(true)
        }
        setCurrentCita(event.target.id)
    }
    const handleClose = (event)=>{
        const idCita=currentCita; 
        const name=event.target.name;
        console.log(idCita);
        if(name==="respuesta"){
            postRespuestaCita(idCita, respuesta)
        }
        if(name==="documentos"){
            postDocumentosCita(idCita,files64, pacienteHistorial.citas[0].DoctorTypeId, pacienteHistorial.citas[0].PacienteTypeId, title)
        }
        fetchPacienteHistorial(pacienteHistorial.citas[0].DoctorTypeId, pacienteHistorial.citas[0].PacienteTypeId)
        setOpenResponse(false)
        setOpenDocuments(false)
        setOpenImage(false)
        setImagen("")
        setFileName("")
        setCurrentCita(0)

    }

    const handleSelectedFile = (event) => {
        setFiles64()
        const file = event.target.files[0];
        // console.log(file);
        setFileName(file.name)
        setFilesToBase(file)
    };
    const setFilesToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFiles64(reader.result)
        }
    };

    const handleText = (event)=>{
        const value = event.target.value;
        setRespuesta(value);
    }

    const handleTextTitle = (event)=>{
        const value = event.target.value;
        setTitle(value);
    }

    const handleImageClick = (event)=>{
        setOpenImage(true)
        setImagen(event.target.name)
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
                            <TableCell align="center">ID CITA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {pacienteHistorial.citas.map(cita => (
                                <TableRow>
                                    <TableCell align="center">{cita.fecha}</TableCell>
                                    <TableCell align="center">{cita.hora}</TableCell>
                                    <TableCell align="center">{cita.descripcion}</TableCell>
                                    <TableCell align="center">{cita.respuestaMedico}</TableCell>
                                    <TableCell align="center">
                                        {cita.documentos.length ? 
                                            cita.documentos.map(doc=>(
                                                <Button onClick={handleImageClick} id={doc.id} name={doc.documento} variant="outlined" sx={{m:"5px"}}>
                                                    {doc.titulo}
                                                </Button>
                                            )) 
                                        : "No hay Documentos"}
                                        <Dialog open={openImage} onClose={handleClose}>
                                            <DialogTitle>Imagen</DialogTitle>
                                            <img alt="img" src={imagen} />
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancelar</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            id={cita.id} 
                                            onClick={handleClickOpen} 
                                            variant="outlined" 
                                            size="small" 
                                            name="respuesta"
                                        >
                                            Dar Respuesta
                                        </Button>
                                        <Button 
                                            id={cita.id} 
                                            onClick={handleClickOpen} 
                                            variant="outlined" 
                                            size="small" 
                                            name="documentos"
                                            sx={{ml:"10px"}}
                                        >
                                            Subir Documento
                                        </Button>
                                        <Dialog open={openResponse} onClose={handleClose}>
                                            <DialogTitle>Respuesta</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Escriba una respuesta de la visita con lo indicado al paciente
                                                </DialogContentText>
                                            </DialogContent>
                                            <TextField 
                                                autoFocus
                                                margin="dense"
                                                id={cita.id}
                                                label="Escriba aqui"
                                                variant="standard"
                                                sx={{margin:"0 10px 0 10px"}}
                                                onChange={handleText}
                                            />
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancelar</Button>
                                            <Button id={cita.id} name="respuesta" variant="contained" onClick={handleClose}>Registrar</Button>
                                        </DialogActions>
                                        </Dialog>
                                        <Dialog open={openDocuments} onClose={handleClose}>
                                            <DialogTitle>Agregar Documento</DialogTitle>
                                            <DialogContent>
                                                <Box sx={{display:"flex", alignItems:"end"}}>
                                                    <Typography type="span">Titulo del Archivo:</Typography>
                                                    <TextField 
                                                        autoFocus
                                                        margin="dense"
                                                        id={cita.id}
                                                        label="Escriba aqui"
                                                        variant="standard"
                                                        sx={{margin:"0 10px 0 10px"}}
                                                        onChange={handleTextTitle}
                                                    />
                                                </Box>
                                                
                                            </DialogContent>
                                                <DialogContentText sx={{p:"0 10px 0 10px", m:"0 auto 0"}}>
                                                    Seleccione el archivo a subir 
                                                </DialogContentText>
                                                <DialogContentText sx={{p:"0 10px 0 10px", m:"0 auto 10px"}}>
                                                        (solo formato imagen)
                                                </DialogContentText>
                                                
                                            <Box sx={{display:"flex", justifyContent:"center", mb:"20px"}}>
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    style={{display: "none"}}
                                                    id="archivos" name="archivos" 
                                                    onChange={handleSelectedFile} 
                                                />
                                                <label htmlFor="archivos">
                                                    <Button
                                                        variant="contained"
                                                        component="span"
                                                        startIcon={<PhotoCamera />}
                                                    >
                                                        Archivo
                                                    </Button>
                                                </label>
                                            </Box>
                                            <Typography sx={{ml:"38%", mb:"10px"}}>{fileName}</Typography>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancelar</Button>
                                                <Button id={cita.id} name="documentos" variant="contained" onClick={handleClose}>Registrar</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>{cita.id}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>           
        </>
    )
}
export default HistorialPaciente