import React, { useEffect, useState } from "react";
import { sendMailToPaciente } from "./helper";
import { TextField, Button, Typography, Box } from "@mui/material";

import {useContext} from "react";
import { Context } from "../../context/ContextProvider";

const MailMensajePaciente = () => {
  const {mailDoctor, setMailDoctor, mailPaciente, setMailPaciente, modal, setModal, snackOk, setSnackOk, snackOkMensaje, setSnackOkMensaje, snackFail, setSnackFail, snackFailMensaje,setSnackFailMensaje} = useContext(Context)[7];
  const {doctorDetail, fetchDoctorByEmail, cleanDetail} = useContext(Context)[0];
  const {patientDetail, fetchPatientByEmail, cleanDetailPaciente } = useContext(Context)[1];

  useEffect(() => {
    if(!patientDetail.nombre) fetchPatientByEmail(mailPaciente);
    if(!doctorDetail.nombre) fetchDoctorByEmail(mailDoctor);
}, [patientDetail, doctorDetail]);

const [values, setValues] = useState({
  nombreDoctor: doctorDetail.nombre,
  apellidoDoctor: doctorDetail.apellido,
  emailRecibe: patientDetail.email,
  emailEscribe: mailDoctor,
  message: `  Estimado ${patientDetail.nombre} ${patientDetail.apellido}:
  Lo contacto para ...

  Saludos,
  ${doctorDetail.nombre} ${doctorDetail.apellido}`,
  subject:"",
});

  const { nombreDoctor, apellidoDoctor, emailRecibe, emailEscribe, message, subject} = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (emailRecibe === "" ||  message === "" || subject==="") {
      alert("Por favor, complete todos los campos");
      return;
    } else {
      sendMailToPaciente(values)
        .then((data) => {
          setSnackOk(true)
          setSnackOkMensaje(data.message)
        })
        .catch((error) => {
          setSnackFail(true)
          setSnackFailMensaje(error.message)
        });
        setModal(false)
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" component="h2">
        Escribir mensaje
      </Typography>
      <Typography variant="body2" component="h2" sx={{ mb: 2 }}>
        (todos los campos son requeridos)
      </Typography>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", width:"400px", mb:"20px"}}>
        <Typography mr="10px">Para:</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={emailRecibe}
          fullWidth
          onChange={handleChange("emailRecibe")}
        />
      </Box>
      <TextField
        id="outlined-basic"
        label="Asunto del Mensaje"
        variant="outlined"
        required
        value={subject}
        onChange={handleChange("subject")}
        sx={{ width: "90%", mb: "20px" }}
      />
      <TextField
        id="outlined-basic"
        label="Mensaje"
        required
        variant="outlined"
        value={message}
        onChange={handleChange("message")}
        sx={{ width: "90%", mb: "10px", height:"100px" }}
        multiline
        rows={6}
      />
      <Box sx={{mt:"100px",width:"200px", display:"flex", justifyContent:"space-between"}}>
        <Button type="submit" variant="contained" color="primary" disabled={emailRecibe !== "" ? (message !== "" ? ( subject!=="" ? false : true):true):true}>
          Enviar
        </Button>
        <Button variant="contained" color="primary" onClick={()=>{setModal(false); setMailPaciente(""); setMailDoctor(""); cleanDetail();cleanDetailPaciente();}}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default MailMensajePaciente;
