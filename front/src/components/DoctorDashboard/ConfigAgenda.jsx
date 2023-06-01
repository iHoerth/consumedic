
import { useState } from 'react';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Divider, Typography, Snackbar, Alert, AlertTitle, } from '@mui/material';
import {Button} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import axios from "axios";

const URL_POSTAGENDA = process.env.REACT_APP_URL_POSTAGENDA 

const ConfigAgenda = ({doctorDetail}) => {
  const [snack, setSnack]=useState(false)
  const [snackFail, setSnackFail]=useState(false)
  const [snackFailMensaje, setSnackFailMensaje]=useState("")

  let check = false;
  let horario_inicio="00:00:00"
  let horario_fin="00:00:00"
  let duracion_turno="00:00:00"
  let dia={}

    //Lunes
    dia = doctorDetail.agenda.find(dia=>dia.dia_semana==="Lunes")
    if(dia?.atiende==="si"){
      check=true
      horario_inicio=dia.horario_inicio.slice(0,-2)
      horario_fin=dia.horario_fin.slice(0,-2)
      duracion_turno=dia.duracion_turno.slice(0,-2)
    } else {
      check=false
      horario_inicio="00:00:00"
      horario_fin="00:00:00"
      duracion_turno="00:00:00"
    }   
    const [check10, setCheck10] = useState(check);
    const [value11, setValue11] = useState(dayjs(`2022-04-17T${horario_inicio}`));
    const [value12, setValue12] = useState(dayjs(`2022-04-17T${horario_fin}`));
    const [value13, setValue13] = useState(dayjs(`2022-04-17T${duracion_turno}`));    

    //Martes
    dia = doctorDetail.agenda.find(dia=>dia.dia_semana==="Martes")
    if(dia?.atiende==="si"){
      check=true
      horario_inicio=dia.horario_inicio.slice(0,-2)
      horario_fin=dia.horario_fin.slice(0,-2)
      duracion_turno=dia.duracion_turno.slice(0,-2)
    } else {
      check=false
      horario_inicio="00:00:00"
      horario_fin="00:00:00"
      duracion_turno="00:00:00"
    }   
    const [check20, setCheck20] = useState(check);
    const [value21, setValue21] = useState(dayjs(`2022-04-17T${horario_inicio}`));
    const [value22, setValue22] = useState(dayjs(`2022-04-17T${horario_fin}`));
    const [value23, setValue23] = useState(dayjs(`2022-04-17T${duracion_turno}`));  
    
    //Miercoles
    dia = doctorDetail.agenda.find(dia=>dia.dia_semana==="Miércoles")
    if(dia?.atiende==="si"){
      check=true
      horario_inicio=dia.horario_inicio.slice(0,-2)
      horario_fin=dia.horario_fin.slice(0,-2)
      duracion_turno=dia.duracion_turno.slice(0,-2)
    } else {
      check=false
      horario_inicio="00:00:00"
      horario_fin="00:00:00"
      duracion_turno="00:00:00"
    }   
    const [check30, setCheck30] = useState(check);
    const [value31, setValue31] = useState(dayjs(`2022-04-17T${horario_inicio}`));
    const [value32, setValue32] = useState(dayjs(`2022-04-17T${horario_fin}`));
    const [value33, setValue33] = useState(dayjs(`2022-04-17T${duracion_turno}`)); 

    //Jueves
    dia = doctorDetail.agenda.find(dia=>dia.dia_semana==="Jueves")
    if(dia?.atiende==="si"){
      check=true
      horario_inicio=dia.horario_inicio.slice(0,-2)
      horario_fin=dia.horario_fin.slice(0,-2)
      duracion_turno=dia.duracion_turno.slice(0,-2)
    } else {
      check=false
      horario_inicio="00:00:00"
      horario_fin="00:00:00"
      duracion_turno="00:00:00"
    }   
    const [check40, setCheck40] = useState(check);
    const [value41, setValue41] = useState(dayjs(`2022-04-17T${horario_inicio}`));
    const [value42, setValue42] = useState(dayjs(`2022-04-17T${horario_fin}`));
    const [value43, setValue43] = useState(dayjs(`2022-04-17T${duracion_turno}`)); 

    //Viernes
    dia = doctorDetail.agenda.find(dia=>dia.dia_semana==="Viernes")
    if(dia?.atiende==="si"){
      check=true
      horario_inicio=dia.horario_inicio.slice(0,-2)
      horario_fin=dia.horario_fin.slice(0,-2)
      duracion_turno=dia.duracion_turno.slice(0,-2)
    } else {
      check=false
      horario_inicio="00:00:00"
      horario_fin="00:00:00"
      duracion_turno="00:00:00"
    }   
    const [check50, setCheck50] = useState(check);
    const [value51, setValue51] = useState(dayjs(`2022-04-17T${horario_inicio}`));
    const [value52, setValue52] = useState(dayjs(`2022-04-17T${horario_fin}`));
    const [value53, setValue53] = useState(dayjs(`2022-04-17T${duracion_turno}`));  

    //Sabado
    dia = doctorDetail.agenda.find(dia=>dia.dia_semana==="Sábado")
    if(dia?.atiende==="si"){
      check=true
      horario_inicio=dia.horario_inicio.slice(0,-2)
      horario_fin=dia.horario_fin.slice(0,-2)
      duracion_turno=dia.duracion_turno.slice(0,-2)
    } else {
      check=false
      horario_inicio="00:00:00"
      horario_fin="00:00:00"
      duracion_turno="00:00:00"
    }   
    const [check60, setCheck60] = useState(check);
    const [value61, setValue61] = useState(dayjs(`2022-04-17T${horario_inicio}`));
    const [value62, setValue62] = useState(dayjs(`2022-04-17T${horario_fin}`));
    const [value63, setValue63] = useState(dayjs(`2022-04-17T${duracion_turno}`)); 
    
    //Domingo
    dia = doctorDetail.agenda.find(dia=>dia.dia_semana==="Domingo")
    if(dia?.atiende==="si"){
      check=true
      horario_inicio=dia.horario_inicio.slice(0,-2)
      horario_fin=dia.horario_fin.slice(0,-2)
      duracion_turno=dia.duracion_turno.slice(0,-2)
    } else {
      check=false
      horario_inicio="00:00:00"
      horario_fin="00:00:00"
      duracion_turno="00:00:00"
    }   
    const [check70, setCheck70] = useState(check);
    const [value71, setValue71] = useState(dayjs(`2022-04-17T${horario_inicio}`));
    const [value72, setValue72] = useState(dayjs(`2022-04-17T${horario_fin}`));
    const [value73, setValue73] = useState(dayjs(`2022-04-17T${duracion_turno}`)); 

    const handleChange = (event) => {
        let id = Number(event.target.id);
        if (id===1) setCheck10(event.target.checked)
        else if (id===2) setCheck20(event.target.checked)
        else if (id===3) setCheck30(event.target.checked)
        else if (id===4) setCheck40(event.target.checked)
        else if (id===5) setCheck50(event.target.checked)
        else if (id===6) setCheck60(event.target.checked)
        else if (id===7) setCheck70(event.target.checked)

    }

    const handleSubmit = () => {
        const lunes = {
            dia_semana: "Lunes",
            atiende: check10 === true ? 'si' : 'no',
            horario_inicio: check10 === true ? value11.$d.toLocaleTimeString() : null,
            horario_fin: check10 === true ? value12.$d.toLocaleTimeString() : null,
            duracion_turno: check10 === true ? value13.$d.toLocaleTimeString() : null,
        }
        const martes = {
            dia_semana: "Martes",
            atiende: check20 === true ? 'si' : 'no',
            horario_inicio: check20 === true ? value21.$d.toLocaleTimeString() : null,
            horario_fin: check20 === true ? value22.$d.toLocaleTimeString() : null,
            duracion_turno: check20 === true ? value23.$d.toLocaleTimeString() : null,
        }
        const miercoles = {
            dia_semana: "Miércoles",
            atiende: check30 === true ? 'si' : 'no',
            horario_inicio: check30 === true ? value31.$d.toLocaleTimeString() : null,
            horario_fin: check30 === true ? value32.$d.toLocaleTimeString() : null,
            duracion_turno: check30 === true ? value33.$d.toLocaleTimeString() : null,
        }
        const jueves = {
            dia_semana: "Jueves",
            atiende: check40 === true ? 'si' : 'no',
            horario_inicio: check40 === true ? value41.$d.toLocaleTimeString() : null,
            horario_fin: check40 === true ? value42.$d.toLocaleTimeString() : null,
            duracion_turno: check40 === true ? value43.$d.toLocaleTimeString() : null,
        }
        const viernes = {
            dia_semana: "Viernes",
            atiende: check50 === true ? 'si' : 'no',
            horario_inicio: check50 === true ? value51.$d.toLocaleTimeString() : null,
            horario_fin: check50 === true ? value52.$d.toLocaleTimeString() : null,
            duracion_turno: check50 === true ? value53.$d.toLocaleTimeString() : null,
        }
        const sabado = {
            dia_semana: "Sábado",
            atiende: check60 === true ? 'si' : 'no',
            horario_inicio: check60 === true ? value61.$d.toLocaleTimeString() : null,
            horario_fin: check60 === true ? value62.$d.toLocaleTimeString() : null,
            duracion_turno: check60 === true ? value63.$d.toLocaleTimeString() : null,
        }
        const domingo = {
            dia_semana: "Domingo",
            atiende: check70 === true ? 'si' : 'no',
            horario_inicio: check70 === true ? value71.$d.toLocaleTimeString() : null,
            horario_fin: check70 === true ? value72.$d.toLocaleTimeString() : null,
            duracion_turno: check70 === true ? value73.$d.toLocaleTimeString() : null,
        }
        const agenda = [lunes, martes, miercoles, jueves, viernes, sabado, domingo]
        const id = doctorDetail.id;
        postAgenda(agenda, id)
      }
      const postAgenda = async (agenda, id) => {
        try {
          const post = await axios.post(URL_POSTAGENDA, {agenda, id})
          setSnack(true)
        } catch (error) {
          setSnackFail(true)
          setSnackFailMensaje("No se pudo Actualizar la Agenda")
        }
    }


  
  return (
    <>
    <Snackbar
        open={snack}
        autoHideDuration={1500}
        onClose={()=>setSnack(false)}
    >
        <Alert severity="success" variant="filled">
            <AlertTitle>Mensaje Exitoso</AlertTitle>
            Los cambios en su Agenda han sido suscriptos
        </Alert>
    </Snackbar>
    <Snackbar
        open={snackFail}
        autoHideDuration={1500}
        onClose={()=>{
          setSnackFail(false)
          setSnackFailMensaje("")
        }}
    >
        <Alert severity="error" variant="filled">
            <AlertTitle>Mensaje de Errror</AlertTitle>
            {snackFailMensaje}
        </Alert>
    </Snackbar>
    <Box style={{display:"flex", flexDirection:"row", justifyContent:"center", padding:"0px 0 10px 0"}}>
        <Typography style={{fontSize:"larger", fontWeight:"600"}}>Configure sus Días y Horarios de Atención</Typography>
    </Box>
    <Divider />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "lightgray", position: "sticky", top: 0, zIndex:1 }}>
          <TableRow>
            <TableCell>Día</TableCell>
            <TableCell align="center">Atiende S/N</TableCell>
            <TableCell align="center">Horario Inicio</TableCell>
            <TableCell align="center">Horario Fin</TableCell>
            <TableCell align="center">Duracion de Turno</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            {/* LUNES */}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>Lunes</Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={check10}  color="secondary" id="1" onChange={handleChange}/>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check10}
                        value={value11}
                        onChange={(newValue) => setValue11(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check10}
                        value={value12}
                        onChange={(newValue) => setValue12(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check10}
                        value={value13}
                        onChange={(newValue) => setValue13(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
            </TableRow>

            {/* Martes */}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>Martes</Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={check20}  color="secondary" id="2" onChange={handleChange}/>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check20}
                        value={value21}
                        onChange={(newValue) => setValue21(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check20}
                        value={value22}
                        onChange={(newValue) => setValue22(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check20}
                        value={value23}
                        onChange={(newValue) => setValue23(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
            </TableRow>

            {/* Miercoles */}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>Miércoles</Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={check30} color="secondary" id="3" onChange={handleChange}/>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check30}
                        value={value31}
                        onChange={(newValue) => setValue31(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check30}
                        value={value32}
                        onChange={(newValue) => setValue32(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check30}
                        value={value33}
                        onChange={(newValue) => setValue33(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
            </TableRow>

            {/* Jueves */}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>Jueves</Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={check40} color="secondary" id="4" onChange={handleChange}/>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check40}
                        value={value41}
                        onChange={(newValue) => setValue41(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check40}
                        value={value42}
                        onChange={(newValue) => setValue42(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check40}
                        value={value43}
                        onChange={(newValue) => setValue43(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
            </TableRow>

            {/* Viernes */}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>Viernes</Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={check50} color="secondary" id="5" onChange={handleChange}/>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check50}
                        value={value51}
                        onChange={(newValue) => setValue51(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField color="secondary"
                        disabled={!check50}
                        value={value52}
                        onChange={(newValue) => setValue52(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField  color="secondary"
                        disabled={!check50}
                        value={value53}
                        onChange={(newValue) => setValue53(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
            </TableRow>
            
            {/* Sabado */}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>Sábado</Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={check60} color="secondary" id="6" onChange={handleChange}/>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField
                         color="secondary"
                        disabled={!check60}
                        value={value61}
                        onChange={(newValue) => setValue61(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField
                        color="secondary"
                        disabled={!check60}
                        value={value62}
                        onChange={(newValue) => setValue62(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField
                         color="secondary"
                        disabled={!check60}
                        value={value63}
                        onChange={(newValue) => setValue63(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
            </TableRow>
            
            {/* Domingo */}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>Domingo</Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={check70} color="secondary" id="7" onChange={handleChange}/>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField  
                        color="secondary"
                        disabled={!check70}
                        value={value71}
                        onChange={(newValue) => setValue71(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField
                         color="secondary"
                        disabled={!check70}
                        value={value72}
                        onChange={(newValue) => setValue72(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
              <TableCell align="center" sx={{width:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                        <TimeField
                         color="secondary"
                        disabled={!check70}
                        value={value73}
                        onChange={(newValue) => setValue73(newValue)}
                        format="HH:mm"
                        />
                    </DemoContainer>
                </LocalizationProvider>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
      <Box style={{display: 'flex', justifyContent: 'center', margin:'12px'}} >
        <Button variant="contained" color="secondary"  onClick={handleSubmit}>Agregar agenda</Button></Box>
    </TableContainer>
    </>
  );
}
export default ConfigAgenda


