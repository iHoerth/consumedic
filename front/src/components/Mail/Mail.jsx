import React, { useState } from "react";
import { sendMail } from "./helper";
import { TextField, Button, Typography, Box } from "@mui/material";

const Mail = () => {
  const [values, setValues] = useState({
    name: "",
    emailMedico: "medicoconsumedic@gmail.com",
    email: "",
    message: "",
  });

  const { name, email, message, emailMedico } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "" || email === "" || message === "") {
      alert("Por favor, complete todos los campos");
      return;
    } else {
      sendMail({ name, email, message, emailMedico })
        .then((data) => {
          alert(data.message);
          setValues({
            ...values,
            name: "",
            email: "",
            message: "",
          });
        })

        .catch((error) => {
          alert(error.message);
        });
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
      <TextField
        id="outlined-basic"
        label="Escriba su nombre"
        variant="outlined"
        value={name}
        onChange={handleChange("name")}
        sx={{ width: "90%", mb: "10px" }}
      />
      <TextField
        id="outlined-basic"
        label="Dejanos tu email para comunicarnos"
        variant="outlined"
        value={email}
        onChange={handleChange("email")}
        sx={{ width: "90%", mb: "10px" }}
      />
      <TextField
        id="outlined-basic"
        label="Mensaje"
        variant="outlined"
        value={message}
        onChange={handleChange("message")}
        sx={{ width: "90%", mb: "10px" }}
        multiline
        rows={3}
      />

      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
};

export default Mail;
