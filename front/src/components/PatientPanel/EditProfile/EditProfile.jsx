import React, { useState, useEffect, useContext } from "react";
import { Context, UtilitiesContext } from "../../../context/ContextProvider";
import Loading from "../../../components/Loading/Loading";
import { TextField, Button, Box, Select, MenuItem } from "@mui/material";

const EditProfile = () => {
  const { session } = useContext(Context)[2];
  const { patientDetail, modifyPatientProfiler, fetchPatientByEmail } =
    useContext(Context)[1];
  const { socialSecurity, fetchUtilities } = useContext(UtilitiesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    session.email &&
      fetchPatientByEmail(session.email).then(() => setLoading(false));
  }, [session.email]);

  useEffect(() => {
    if (!socialSecurity.length) {
      fetchUtilities();
    } else {
      setLoading(false);
    }
  }, [socialSecurity]);

  const { id, dni, email, telefono, nombre, apellido } = patientDetail;
  console.log("patientDetail", patientDetail);
  console.log("socialSecurity", socialSecurity);

  const [datos, setDatos] = useState({
    id: id,
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    email: email,
    telefono: telefono,
    obraSocial: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setDatos({
      ...datos,
      [property]: value,
    });
  };

  const handleSave = () => {
    // como enviar una solicitud al servidor.
  };

  function obtenerIdObraSocial(nombreObraSocial) {
    const obraSocial = socialSecurity.find(
      (os) => os.nombre === nombreObraSocial
    );
    if (obraSocial) {
      return obraSocial.id;
    }
    return null; // Si no se encuentra la obra social, se puede retornar null o algún otro valor indicativo de que no se encontró.
  }

  const nombreObraSocial = datos.obraSocial;
  const ObraSociald = obtenerIdObraSocial(nombreObraSocial);
  console.log("datos", ObraSociald);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
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
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              sx={{ mt: "20px", width: "50%" }}
            />
            <TextField
              label="Apellido"
              name="apellido"
              value={datos.apellido}
              onChange={handleChange}
              sx={{ mt: "20px", width: "50%" }}
            />
            <TextField
              label="Dni"
              name="dni"
              value={datos.dni}
              onChange={handleChange}
              sx={{ mt: "20px", width: "50%" }}
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              sx={{ mt: "20px", width: "50%" }}
            />
            <TextField
              label="Email"
              name="email"
              value={datos.email}
              disabled
              sx={{ mt: "20px", width: "50%" }}
            />

            <Select
              label="Obra social"
              sx={{ mt: "20px", width: "50%", mb: "30px" }}
              name="obraSocial"
              value={datos.obraSocial} // Asignar el valor actual del estado al componente Select
              onChange={handleChange}
            >
              {socialSecurity.map((obrasocial) => (
                <MenuItem key={obrasocial.id} value={obrasocial.nombre}>
                  {obrasocial.nombre}
                </MenuItem>
              ))}
            </Select>
            <Button
              sx={{ mt: "10px" }}
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default EditProfile;

/** <TextField
              label="Obra Social"
              value={socialSecurity}
              onChange={(e) => setSocialSecurity(e.target.value)}
              sx={{ mt: "20px", width: "50%" }}
            />*/
