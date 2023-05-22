import { useState, useContext, useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Button, Box, Typography, Divider, TextField, Avatar, Autocomplete } from '@mui/material';

import Loading from "../Loading/Loading";

import { Context, UtilitiesContext } from '../../context/ContextProvider';
import { Stack } from "@mui/system";

import { styled } from "@mui/material/styles";



const EditarPerfil = ({doctorDetail1}) => {
    const {id, nombre, Descripcion, apellido, direccion, dni, email, imagen, precio, telefono, titulo, Especialidads, ObraSocials} = doctorDetail1
    const { socialSecurity, specialties, fetchUtilities } = useContext(UtilitiesContext);
    const {putDoctor, doctorDetail,fetchDoctorByEmail} = useContext(Context)[0];
    const [loading, setLoading] = useState(true);
    const [openEspecialidades, setOpenEspecialidades] = useState(false)
    const [openObrasSociales, setOpenObrasSociales] = useState(false)
    const [openImagen, setOpenImagen]=useState(false)
    const [fileName, setFileName] = useState("")
    const [files64, setFiles64]=useState()

    useEffect(() => {
       if(!socialSecurity.length && !specialties.length){
        const search = async () => {
            await fetchUtilities()
          }
          search()
       }
       else{
        setLoading(false);
       }

    }, [loading, socialSecurity,specialties,doctorDetail]);

    //console.log(doctorDetail1);

    const [datos, setDatos]= useState({
        id: id,
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        dni: dni,
        email: email,
        prevImagen: imagen,
        imagen: imagen,
        precio: precio,
        telefono: telefono,
        titulo: titulo,
        oldEspecialidades: Especialidads,
        especialidades: Especialidads,
        oldObrasSociales: ObraSocials,
        obrasSociales: ObraSocials,
        Descripcion: Descripcion
    })
    let especialidadesString = datos.especialidades.map(esp=> esp.name)
    especialidadesString=especialidadesString.join(", ")
    
    let obrasSocialesString = datos.obrasSociales.map(esp=> esp.nombre)
    obrasSocialesString=obrasSocialesString.join(", ")
    

    const handleClick = (event)=>{
        const name = event.target.name;
        console.log(name);
        if(name==="especialidades"){
            setOpenEspecialidades(true)
        }
        if(name==="obrasSociales"){
            setOpenObrasSociales(true)
        }
        if(name==="foto"){
            setOpenImagen(true)
        }

    }

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setDatos({
          ...datos,
          [property]: value,
        });
    };
    const handleEspecialidad = (selectedOptionsE) => {
        const property = "especialidades";
        const values = selectedOptionsE;
        console.log(property);
        console.log(values);
        setDatos({
          ...datos,
          [property]: values,
        });
      };

      const handleObrasSociales = (selectedOptionsE) => {
        const property = "obrasSociales";
        const values = selectedOptionsE;
        console.log(property);
        console.log(values);
        setDatos({
          ...datos,
          [property]: values,
        });
      };

    const handleClose = (event)=>{
        const name = event.target.name;
        console.log(name);
        if(name==="registrarEspecialidades"){
            setOpenEspecialidades(false)
        }
        if(name==="registrarObrasSociales"){
            setOpenEspecialidades(false)
        }
        if(name==="documentos"){
            setOpenImagen(false)
        }
        setOpenEspecialidades(false)
        setOpenObrasSociales(false)
        setOpenImagen(false)
        setFileName("")

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
        const property = "imagen"
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const values=reader.result
            setFiles64(values)
            setDatos({
                ...datos,
                [property]: values,
            });
        };
    }

    const handleSubmit = async () => {
        await putDoctor(datos)
        await fetchDoctorByEmail(datos.email)
    }
   
    if(loading) return (<Loading />)
    else{
        return (  
            
            <>
            <Stack alignItems="center">
                <Typography sx={{fontSize:"25px", fontWeight:"500", mb:"15px"}}>Editar los datos de Perfil</Typography>
                <Stack direction="row" spacing={5} justifyContent="space-around">
                    <Stack>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}>Nombre:</Typography>
                            <TextField size="small" value={datos.nombre} name="nombre" onChange={handleChange}></TextField>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}>Apellido:</Typography>
                            <TextField size="small" value={datos.apellido} name="apellido" onChange={handleChange}></TextField>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}  >D.N.I.:</Typography>
                            <TextField size="small" value={datos.dni} name="dni" onChange={handleChange}></TextField>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}  >Dirección:</Typography>
                            <TextField size="small" value={datos.direccion} name="direccion" onChange={handleChange}></TextField>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}>Email:</Typography>
                            <TextField size="small" value={datos.email} name="email" disabled></TextField>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}  >Teléfono:</Typography>
                            <TextField size="small" value={datos.telefono} name="telefono" onChange={handleChange}></TextField>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}} >Título:</Typography>
                            <TextField size="small" value={datos.titulo} name="titulo" onChange={handleChange} ></TextField>
                        </Box>
                    </Stack>
                    <Divider orientation="vertical" flexItem/>
                    <Stack>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}>Valor de Consulta:</Typography>
                            <TextField size="small" value={datos.precio}  name="precio" onChange={handleChange}></TextField>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}>Especialidades:</Typography>   
                            <TextField size="small" value={especialidadesString} disabled></TextField>
                            <Button onClick={handleClick} name="especialidades" variant="contained" sx={{ml:"10px"}} size="small" startIcon={<EditIcon/>}>Editar</Button>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}>Obras Sociales:</Typography>
                            <TextField size="small" value={obrasSocialesString} disabled></TextField>
                            <Button onClick={handleClick} name="obrasSociales" variant="contained" sx={{ml:"10px"}} size="small" startIcon={<EditIcon/>}>Editar</Button>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}}>Imagen:</Typography>
                            <Avatar alt={`${datos.nombre} ${datos.apellido}`} src={datos.imagen} sx={{width:80, height:80}}/>
                            <Button onClick={handleClick} name="foto" variant="contained" sx={{ml:"10px"}} size="small" startIcon={<AddAPhotoIcon/>}>Editar Foto</Button>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"10px"}}>
                            <Typography sx={{mr:"10px", width:"150px"}} >Descripción:</Typography>
                            <TextField  value={datos.Descripcion} name="Descripcion" onChange={handleChange} multiline fullWidth  rows={3}></TextField>
                        </Box>
                    </Stack>
                </Stack>
                <Button variant="contained" sx={{width:"200px", mt:"30px", mr:"80px"}} onClick={handleSubmit}>Guardar Cambios</Button>
            </Stack>
            <Dialog open={openEspecialidades} onClose={handleClose} fullWidth="true">
                <DialogTitle>Editar Especialidades</DialogTitle>
                <DialogContent sx={{height:"200px", display:"flex", alignItems:"top", justifyContent:"center"}}>
                    <DialogContentText sx={{m:"20px 30px 0 0"}}>Seleccione Especialidades:</DialogContentText>
                    <Autocomplete
                        multiple
                        sx={{
                            width: 240,
                        }}
                        disablePortal
                        id="obra social"
                        name="obra social"
                        options={specialties}
                        getOptionLabel={(option) => {
                            return option.name;
                        }}
                        renderInput={(params) => (
                            <TextField
                            sx={{ bgcolor: "white", borderRadius: "4px" }}
                            {...params}
                            label="Especialidad"
                            />
                            )}
                            renderOption={(props, option) => (
                                <li
                                style={{ fontSize: "14px" }}
                                {...props}
                                key={option.id}
                                id={option.id}
                                value={option.name}
                                >
                            {option.name}
                        </li>
                        )}
                        onChange={(selectedOptionsE, value) =>
                            handleEspecialidad(value)
                        }
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose} name="registrarEspecialidades" variant="contained">Registrar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openObrasSociales} onClose={handleClose} fullWidth="true">
                <DialogTitle>Editar Obras Sociales</DialogTitle>
                <DialogContent sx={{height:"200px", display:"flex", alignItems:"top", justifyContent:"center"}}>
                    <DialogContentText sx={{m:"20px 30px 0 0"}}>Seleccione Obras Sociales:</DialogContentText>
                    <Autocomplete
                        multiple
                        sx={{
                            width: 240,
                        }}
                        disablePortal
                        id="especialidad"
                        name="especialidad"
                        options={socialSecurity}
                        getOptionLabel={(option) => {
                            return option.nombre;
                        }}
                        renderInput={(params) => (
                            <TextField
                            sx={{ bgcolor: "white", borderRadius: "4px" }}
                            {...params}
                            label="Obras Sociales"
                            />
                            )}
                            renderOption={(props, option) => (
                                <li
                                style={{ fontSize: "14px" }}
                                {...props}
                                key={option.id}
                                id={option.id}
                                value={option.nombre}
                                >
                            {option.nombre}
                        </li>
                        )}
                        onChange={(selectedOptionsE, value) =>
                            handleObrasSociales(value)
                        }
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose} name="registrarObrasSociales" variant="contained">Registrar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openImagen} onClose={handleClose}>
                <DialogTitle>Actualizar Imagen de Perfil</DialogTitle>
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
                    <Button name="documentos" variant="contained" onClick={handleClose}>Registrar</Button>
                </DialogActions>
            </Dialog>
        </>
        
        )
    }
}
export default EditarPerfil