import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Box, AvatarGroup } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Opinions from "../../Opinions/Opinions";
import { useTheme } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../../context/ContextProvider";

const Profile = ({ doctorDetail }) => {
  const theme = useTheme();
  const { nombre, apellido, direccion, Especialidads, imagen } = doctorDetail;
  const {
    pacientes,
    pacienteHistorial,
    fetchPacientes,
    fetchPacienteHistorial,
  } = useContext(Context)[3];

  const opinions = [
    {
      name: "John Doe",
      text: "Excelente servicio. Muy recomendado.",
      stars: 5,
      img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
    },
    {
      name: "Jane Smith",
      text: "Buen trato y atención al paciente.",
      stars: 4,
      img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
    },
    {
      name: "Michael Johnson",
      text: "No quedé satisfecho con la atención recibida.",
      stars: 2,
      img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
    },
    {
      name: "John Doe",
      text: "Excelente servicio. Muy recomendado.",
      stars: 5,
      img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
    },
    {
      name: "Jane Smith",
      text: "Buen trato y atención al paciente.",
      stars: 4,
      img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
    },
    {
      name: "Michael Johnson",
      text: "No quedé satisfecho con la atención recibida.",
      stars: 2,
      img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "45rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: "10px",
        }}
      >
        <CardContent
          sx={{
            bgcolor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            width: "95%",
            borderRadius: "10px",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={imagen}
            sx={{
              width: 200,
              height: 200,
            }}
          />
          <Box
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "white",
              width: "50%",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                Hola Dr. {nombre + " " + apellido}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Aqui puede ver todos sus datos.
              </Typography>
            </Grid>
          </Box>
        </CardContent>
      </Box>
      <Box
        container
        sx={{
          display: "flex",
          width: "90%",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            pb: "20px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {nombre + " " + apellido}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              pb: "1px",
            }}
          >
            {doctorDetail.Especialidads?.length &&
              doctorDetail.Especialidads.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {direccion}
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total pascientes
            <AvatarGroup total={pacientes.length}>
              <Avatar
                alt="Remy Sharp"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
              />
              <Avatar
                alt="Travis Howard"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
              />
              <Avatar
                alt="Agnes Walker"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
              />
            </AvatarGroup>
          </Typography>
        </Grid>
      </Box>
      <Box sx={{ width: "30%", mt: "40px" }}>
        <Grid container>
          <Opinions opinions={opinions} />
        </Grid>
      </Box>
    </Box>
  );
};
export default Profile;
