import React, { useState } from "react";
import { sendMail } from "./helper";
import { TextField, Button, Typography, Box } from "@mui/material";

import { useContext } from "react";
import { Context } from "../../context/ContextProvider";

const MailMensajeDoctor = ({ emailMedico }) => {
  const {
    modal,
    setModal,
    snackOk,
    setSnackOk,
    snackOkMensaje,
    setSnackOkMensaje,
    snackFail,
    setSnackFail,
    snackFailMensaje,
    setSnackFailMensaje,
  } = useContext(Context)[7];
  const [values, setValues] = useState({
    name: "",
    emailRecibe: emailMedico,
    emailEscribe: "",
    message: "",
    subject: "",
  });

  const { name, emailRecibe, message, emailEscribe, subject } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      name === "" ||
      emailEscribe === "" ||
      message === "" ||
      subject === ""
    ) {
      alert("Por favor, complete todos los campos");
      return;
    } else {
      console.log(values);
      sendMail(values)
        .then((data) => {
          setSnackOk(true);
          setSnackOkMensaje(data.message);
          setValues({
            ...values,
            name: "",
            emailEscribe: "",
            message: "",
            subject: "",
          });
        })
        .catch((error) => {
          setSnackFail(true);
          setSnackFailMensaje(error.message);
        });
      setModal(false);
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
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Escribir mensaje
      </Typography>
      <Typography variant="body2" component="h2" sx={{ mb: 2 }}>
        (todos los campos son requeridos)
      </Typography>
      <TextField
        id="outlined-basic"
        label="Escriba su nombre"
        variant="outlined"
        value={name}
        required
        onChange={handleChange("name")}
        sx={{ width: "90%", mb: "10px" }}
      />
      <TextField
        id="outlined-basic"
        label="Dejanos tu email para comunicarnos"
        type="email"
        variant="outlined"
        value={emailEscribe}
        required
        onChange={handleChange("emailEscribe")}
        sx={{ width: "90%", mb: "10px" }}
      />
      <TextField
        id="outlined-basic"
        label="Asunto del Mensaje"
        variant="outlined"
        required
        value={subject}
        onChange={handleChange("subject")}
        sx={{ width: "90%", mb: "10px" }}
      />
      <TextField
        id="outlined-basic"
        label="Mensaje"
        required
        variant="outlined"
        value={message}
        onChange={handleChange("message")}
        sx={{ width: "90%", mb: "10px" }}
        multiline
        rows={3}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={
          name !== ""
            ? emailEscribe !== ""
              ? message !== ""
                ? subject !== ""
                  ? false
                  : true
                : true
              : true
            : true
        }
      >
        Enviar
      </Button>
    </Box>
  );
};

export default MailMensajeDoctor;
