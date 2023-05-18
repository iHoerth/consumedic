import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import ConfigAgenda from "../../components/DoctorDashboard/ConfigAgenda";
import Profile from "../../components/DoctorDashboard/Profile/Profile";

import { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Stack, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const DoctorDashboard = () => {
  const [view, setView] = useState(0);
  const views = [
    "Mi Perfil",
    "Editar Perfil",
    "Ver Mis Turnos",
    "Configurar Agenda",
    "Administrar Agenda",
    "Ver Opiniones",
    "Mis Pacientes",
    "Gestionar Cuenta",
  ];
  const handleClick = (event) => {
    const index = views.findIndex((el) => el === event.target.innerHTML);
    console.log(event.target.innerHTML);
    console.log(index);
    setView(index);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{ mt: "100px", mb: "40px" }}>
        <Box sx={{ height: "85vh" }}>
          <Stack
            direction="row"
            sx={{ border: "1px solid", borderColor: "#bababa" }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box sx={{ height: "85vh", width: "150px" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="list-subheader"
                subheader={
                  <ListItemButton>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: "20px",
                        fontWeight: "500",
                      }}
                      sx={{ m: "0px" }}
                      primary="Mi Perfil"
                      onClick={handleClick}
                    />
                  </ListItemButton>
                }
              >
                <Divider />
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Editar Perfil"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Ver Mis Turnos"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Configurar Agenda"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Administrar Agenda"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Ver Opiniones"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Mis Pacientes"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Gestionar Cuenta"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <Divider />
              </List>
            </Box>
            <Box
              sx={{
                height: "85vh",
                width: "90vw",
                m: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* ACA VAN LOS  COMPONENTES QUE SE RENDERIZAN A LA DERECHA DE LA LISTA */}

              {view === 0 ? <Profile /> : view === 2 ? <ConfigAgenda /> : null}
            </Box>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default DoctorDashboard;
