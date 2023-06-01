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
  const {
    restorePatient,
    fetchPatients,
    patientDetail,
    fetchPatientByEmail,
    deletePatient,
    fetchSoftDeletedPatient,
  } = useContext(Context)[1];
  const { setVista, email, setAdmin } = useContext(Context)[6];
  const { session } = useContext(Context)[2];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientDetail) {
      fetchPatientByEmail(patientDetail.email);
    } else {
      setLoading(false);
    }
  }, [patientDetail]);

  const handleClickDelete = (id) => {
    if (patientDetail.deletedAt) {
      restorePatient(id)
        .then(() => {
          // Eliminación exitosa, actualizar la lista de pacientes
          fetchSoftDeletedPatient();
          fetchPatients();
          alert("El paciente ha sido restaurado exitosamente.");
        })
        .catch((error) => {
          console.log("Error al restaurar el paciente:", error);
          // Manejar el error de eliminación del paciente
        });
    } else {
      deletePatient(id)
        .then(() => {
          // Eliminación exitosa, actualizar la lista de pacientes
          fetchPatients();
          fetchSoftDeletedPatient();
          alert("El paciente ha sido eliminado exitosamente.");
        })
        .catch((error) => {
          console.log("Error al eliminar el paciente:", error);
          // Manejar el error de eliminación del paciente
        });
    }
  };

  const handleClickAdmin = async (id) => {
    await setAdmin(id);
    await fetchPatientByEmail(patientDetail.email);
  };

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
          <ListItemText secondary="Contraseña" primary="****************" />
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
          onClick={() => setVista(patientDetail.deletedAt === null ? 1 : 3)}
          style={{ marginRight: "10px" }}
        >
          Volver
        </Button>

        <Button
          id={patientDetail.id}
          variant="outlined"
          color="warning"
          size="small"
          onClick={() => {
            handleClickDelete(patientDetail.id);
            setVista(patientDetail.deletedAt === null ? 1 : 3);
          }}
        >
          {patientDetail.deletedAt ? "Restaurar" : "Eliminar"}
        </Button>

        <Button
          id={patientDetail.id}
          variant="outlined"
          onClick={() => {
            handleClickAdmin(patientDetail.id);
          }}
          style={{
            display:
              session.email === "consumedicgeneral@gmail.com" &&
              patientDetail.email !== "consumedicgeneral@gmail.com"
                ? "block"
                : "none",
          }}
        >
          {patientDetail.admin ? "Sacar Admin" : "Hacer Admin"}
        </Button>
      </Box>
    </>
  );
};

export default DetallePaciente;
