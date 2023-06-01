import { useState, useContext, useEffect } from "react";
import { Context } from '../../context/ContextProvider';
import { sendMailDocumento, sendMailRespuesta } from "../Mail/helper";

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
import { Button, Box, Typography, Snackbar, Alert, AlertTitle} from '@mui/material';
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
    const {mailDoctor, setMailDoctor, mailPaciente, setMailPaciente, modal, setModal, snackOk, setSnackOk, snackOkMensaje, setSnackOkMensaje, snackFail, setSnackFail, snackFailMensaje,setSnackFailMensaje} = useContext(Context)[7];
    const {doctorDetail, fetchDoctorByEmail, cleanDetail} = useContext(Context)[0];
    const {patientDetail, fetchPatientByEmail, cleanDetailPaciente } = useContext(Context)[1];
    const { session } = useContext(Context)[2];
    const [loading, setLoading] = useState(true);
    const [openResponse, setOpenResponse] = useState(false)
    const [openDocuments, setOpenDocuments] = useState(false)
    const [openImage, setOpenImage] = useState(false)
    const [imagen, setImagen] = useState("")
    const [fileName, setFileName] = useState("")
    const [title, setTitle] = useState("")
    const [snackRespuesta, setSnackRespuesta]=useState(false)
    const [snackDocumento, setSnackDocumento]=useState(false)
    const [fileSize, setFileSize]=useState()
    const [alert, setAlert] = useState(false)


    const [files64, setFiles64]=useState("")
    const [respuesta, setRespuesta]=useState("")
    const [currentCita,setCurrentCita]=useState(0)

    useEffect(() => {
        if (pacienteHistorial){
          setLoading(false);
        }
        else{
            fetchDoctorByEmail(session.email)
        }
        console.log(pacienteHistorial);
    }, [loading, pacienteHistorial]);

    console.log(patientDetail, doctorDetail);


    useEffect(() => {
        fetchPacienteHistorial(pacienteHistorial.citas[0].DoctorTypeId, pacienteHistorial.citas[0].PacienteTypeId)
        
    }, [openResponse,openDocuments, imagen, files64, snackDocumento]);

    const handleClickBack = async () =>{
        setVista(6) 
    }

    const [values, setValues] = useState({
        nombreDoctor: doctorDetail.nombre,
        apellidoDoctor: doctorDetail.apellido,
        emailRecibe: patientDetail.email,
        emailEscribe: mailDoctor,
        subjectDocumento: `El Doctor ${doctorDetail.nombre} ${doctorDetail.apellido} ha registrado un documento`,
        messageDocumento: `Estimado ${patientDetail.nombre} ${patientDetail.apellido}:
        El Doctor ${doctorDetail.nombre} ${doctorDetail.apellido} ha subido un documento al sistema con el titulo `,
        subjectRespuesta: `El Doctor ${doctorDetail.nombre} ${doctorDetail.apellido} ha registrado un comentario`,
        messageRespuesta: `Estimado ${patientDetail.nombre} ${patientDetail.apellido}:
        El Doctor ${doctorDetail.nombre} ${doctorDetail.apellido} ha resgistrado la siguiente respuesta al sistema: ` 
      });
      const {nombreDoctor, apellidoDoctor, emailRecibe, emailEscribe, subjectRespuesta, messageRespuesta, subjectDocumento, messageDocumento} = values

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
            setSnackRespuesta(true)
            sendMailRespuesta({nombreDoctor, apellidoDoctor, emailRecibe, emailEscribe, subjectRespuesta, messageRespuesta, respuesta})

        }
        if(name==="documentos"){
            postDocumentosCita(idCita,files64, pacienteHistorial.citas[0].DoctorTypeId, pacienteHistorial.citas[0].PacienteTypeId, title)
            setSnackDocumento(true)
            sendMailDocumento({nombreDoctor, apellidoDoctor, emailRecibe, emailEscribe, subjectDocumento, messageDocumento, title})
        }
        fetchPacienteHistorial(pacienteHistorial.citas[0].DoctorTypeId, pacienteHistorial.citas[0].PacienteTypeId)
        setOpenResponse(false)
        setOpenDocuments(false)
        setOpenImage(false)
        setImagen("")
        setFileName("")
        setCurrentCita(0)
        setFiles64("")
        setRespuesta("")
        fetchDoctorByEmail(doctorDetail.email)
        fetchDoctorByEmail(session.email)
        setFileSize()


    }

    const handleSelectedFile = (event) => {
        setFiles64()
        const file = event.target.files[0];
        // console.log(file);
        setFileName(file.name)
        setFilesToBase(file)
    };
    const setFilesToBase = (file) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let fileSize = reader.result.length;
                fileSize = (fileSize/1024/1024).toFixed(2);
                setFileSize(fileSize)
                if(fileSize>1)setAlert(true)
                else setAlert(false)
              };
            reader.onloadend = () => {
                setFiles64(reader.result)
            }
            
        } catch (error) {
            
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
                <Box style={{display:"flex", flexDirection:"row", justifyContent:"center", padding:"0px 0 10px 0"}}>
                    <Typography style={{fontSize:"larger", fontWeight:"600"}}>Historial Médico del Paciente</Typography>
                </Box>
                <Box sx={{position:"absolute",  right:"10%", mb: "15px"}}>
                    <Button onClick={handleClickBack} style={{width:"200px"}} color="secondary" variant="contained" size="small">Volver a Pacientes</Button>
                </Box>
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
                                            color="secondary"
                                        >
                                            {cita.respuestaMedico===null ? "Dar Respuesta" : "Editar Respuesta"}
                                        </Button>
                                        <Button 
                                            id={cita.id} 
                                            onClick={handleClickOpen} 
                                            variant="outlined" 
                                            size="small" 
                                            name="documentos"
                                            sx={{ml:"10px"}}
                                            color="secondary"
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
                                                color="secondary"
                                            />
                                        <DialogActions>
                                            <Button onClick={handleClose} 
                                            color="secondary">Cancelar</Button>
                                            <Button id={cita.id} name="respuesta" color="secondary" variant="contained" onClick={handleClose} disabled={respuesta==="" ? true : false} >Registrar</Button>
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
                                                        color="secondary"
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
                                                    color="secondary"
                                                    id="archivos" name="archivos" 
                                                    onChange={handleSelectedFile} 
                                                />
                                                <label htmlFor="archivos">
                                                    <Button
                                                        variant="contained"
                                                        component="span"
                                                        color="secondary"
                                                        startIcon={<PhotoCamera />}
                                                    >
                                                        Archivo
                                                    </Button>
                                                </label>
                                            </Box>
                                            <Typography sx={{ml:"2%", mb:"10px"}}>{fileName}</Typography>
                                            <Typography sx={{ml:"2%", mb:"10px"}}>{fileSize?`size: ${fileSize} mb`:null}</Typography>
                                            <Typography sx={{ml:"2%", mb:"10px", color:"red"}}>{alert?"El archivo debe tener menos de 1mb":null}</Typography>

                                            <DialogActions>
                                                <Button onClick={handleClose} color="secondary">Cancelar</Button>
                                                <Button id={cita.id} name="documentos" color="secondary" variant="contained" onClick={handleClose} disabled={title===""? true :(files64===""?true:(alert?true:false))}>Registrar</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>{cita.id}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer> 
            <Snackbar
                open={snackDocumento}
                autoHideDuration={1500}
                onClose={()=>setSnackDocumento(false)}
            >
                <Alert severity="success" variant="filled">
                    <AlertTitle>Mensaje Exitoso</AlertTitle>
                    Su documento ha sido registrado
                </Alert>
            </Snackbar>       
            <Snackbar
                open={snackRespuesta}
                autoHideDuration={1500}
                onClose={()=>setSnackRespuesta(false)}
            >
                <Alert severity="success" variant="filled">
                    <AlertTitle>Mensaje Exitoso</AlertTitle>
                    Su Respuesta ha sido registrada
                </Alert>
            </Snackbar>   
        </>
    )
}
export default HistorialPaciente