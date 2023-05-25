import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  // Typography,
  // Divider,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
// import KeyIcon from "@mui/icons-material/Key";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
// import { useTheme } from "@emotion/react";

const DetalleDoctor = () => {
  // const theme = useTheme();
  // const { session } = useContext(Context[2]);
  const { fetchDoctors, doctorDetail, fetchDoctorByEmail, deleteDoctor } =
    useContext(Context)[0];
  const { setVista, email } = useContext(Context)[6];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorDetail) {
      fetchDoctorByEmail(email);
    } else {
      setLoading(false);
    }
  }, [doctorDetail]);

  const handleClickDelete = (id) => {
    deleteDoctor(id)
      .then(() => {
        // Eliminación exitosa, actualizar la lista de pacientes
        fetchDoctors();
      })
      .catch((error) => {
        console.log("Error al eliminar el doctor:", error);
        // Manejar el error de eliminación del paciente
      });
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
            primary={`${doctorDetail.nombre} ${doctorDetail.apellido}`}
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
            primary={`${doctorDetail.telefono}`}
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
            primary={`${doctorDetail.email}`}
          />
        </ListItem>

        {/* <ListItem>
          <ListItemAvatar>
            <Avatar>
              <KeyIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary="password"
            primary={`${doctorDetail.password}`}
          />
        </ListItem> */}

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <QuestionMarkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary="admin?" primary={`${doctorDetail.admin}`} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Grid3x3Icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary="id" primary={`${doctorDetail.id}`} />
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
          onClick={() => setVista(2)}
          style={{ marginRight: "10px" }}
        >
          Volver
        </Button>

        <Button
          id={doctorDetail.id}
          variant="outlined"
          onClick={() => {
            handleClickDelete(doctorDetail.id);
            setVista(2);
          }}
        >
          Eliminar
        </Button>
      </Box>
    </>
  );
};

export default DetalleDoctor;
