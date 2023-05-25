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
import KeyIcon from '@mui/icons-material/Key';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
const DetalleDoctor = () => {
  const { doctorDetail, fetchDoctorByEmail,fetchDoctors,doctors } = useContext(Context)[1];
  const { setVista, email } = useContext(Context)[6];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorDetail) {
        fetchDoctorByEmail(email);
    } else {
      setLoading(false);
    }
  }, [doctorDetail]);

  

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

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <KeyIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary="password"
            primary={`${doctorDetail.password}`}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <QuestionMarkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary="admin?"
            primary={`${doctorDetail.admin}`}
          />
        </ListItem>


        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Grid3x3Icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary="id"
            primary={`${doctorDetail.id}`}
          />
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
       
      </Box>
    </>
  );
};




export default DetalleDoctor;
