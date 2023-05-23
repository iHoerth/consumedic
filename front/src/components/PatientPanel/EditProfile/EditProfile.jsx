import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [socialSecurity, setSocialSecurity] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    // como enviar una solicitud al servidor.

    console.log({
      name,
      lastName,
      phone,
      socialSecurity,
      email,
    });
  };

  return (
    <Box
      component="form"
      //onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>Cambiar Datos </Box>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: "20px", width: "50%" }}
      />
      <TextField
        label="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        sx={{ mt: "20px", width: "50%" }}
      />
      <TextField
        label="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{ mt: "20px", width: "50%" }}
      />
      <TextField
        label="Obra Social"
        value={socialSecurity}
        onChange={(e) => setSocialSecurity(e.target.value)}
        sx={{ mt: "20px", width: "50%" }}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: "20px", width: "50%" }}
      />
      <Button
        sx={{ mt: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleSave}
      >
        Guardar
      </Button>
    </Box>
  );
};

export default EditProfile;
