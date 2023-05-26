import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
const DetallePaciente = () => {
  const { fetchPatients, patientDetail, fetchPatientByEmail, deletePatient } =
    useContext(Context)[1];
  const { setVista, email } = useContext(Context)[6];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientDetail) {
      fetchPatientByEmail(email);
    } else {
      setLoading(false);
    }
  }, [patientDetail]);

  const handleClickDelete = (id) => {
    deletePatient(id)
      .then(() => {
        // Eliminación exitosa, actualizar la lista de pacientes
        fetchPatients();
        alert("El paciente ha sido eliminado exitosamente.");
      })
      .catch((error) => {
        console.log("Error al eliminar el paciente:", error);
        // Manejar el error de eliminación del paciente
      });
  };
  // const deletePatient = async (patientId) => {
  //   try {
  //     // Llamada para eliminar el paciente
  //     await axios.delete(`/detail/${patientId}`);
  //   } catch (error) {
  //     // Manejo de errores en caso de fallo en la eliminación
  //     console.error( error);
  //     throw new Error("Fallo en eliminar paciente");
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     await deletePatient(patientDetail.id);
  //     alert("La cuenta se eliminó correctamente");
  //     await fetchPatients(); // Llama a la función para obtener la lista actualizada de pacientes
  //     setVista(1);
  //   } catch (error) {
  //     console.log("Error al eliminar el paciente:", error);
  //     // Manejar el error al eliminar el paciente
  //   }
  // };

  return (
    <>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary="Nombre y Apellido"
            primary={`${patientDetail.nombre} ${patientDetail.apellido}`}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary="Teléfono"
            primary={`${patientDetail.telefono}`}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary="Correo Electrónico"
            primary={`${patientDetail.email}`}
          />
        </ListItem>

        <ListItem>
  <ListItemAvatar>
    <Avatar>
      <KeyIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText secondary="password" primary="****************" />
</ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <QuestionMarkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary="admin?" primary={`${patientDetail.admin}`} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Grid3x3Icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary="id" primary={`${patientDetail.id}`} />
        </ListItem>
      </List>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="20px"
        marginBottom="20px"
      >
        <Button
          variant="outlined"
          onClick={() => setVista(1)}
          style={{ marginRight: "10px" }}
        >
          Volver
        </Button>

        <Button
          id={patientDetail.id}
          variant="outlined"
          onClick={() => {
            handleClickDelete(patientDetail.id);
            setVista(1);
          }}
        >
          Eliminar
        </Button>
      </Box>
    </>
  );
};

export default DetallePaciente;
