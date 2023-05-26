import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
// import ConfigAgenda from "../../components/DoctorDashboard/ConfigAgenda";
// import Pacientes from "../../components/DoctorDashboard/Pacientes";

import { useTheme } from "@mui/material";

import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Stack, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
// import HistorialPaciente from "../../components/DoctorDashboard/HistorialPaciente";
// import Turnos from "../../components/DoctorDashboard/Turnos";
// import EditarPerfil from "../../components/DoctorDashboard/EditarPerfil";
import DetallePaciente from "../../components/Panel Admin/DetallePaciente";
import EditarDoctores from "../../components/Panel Admin/EditarDoctores";
import DetalleDoctor from "../../components/Panel Admin/DetalleDoctor";
import EditarPacientes from "../../components/Panel Admin/EditarPacientes";
import UsuariosEliminados from "../../components/Panel Admin/UsuariosEliminados";

const Admin = () => {
  const theme = useTheme();
  // const { session } = useContext(Context)[2];
  const { vista, setVista } = useContext(Context)[6];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const views = ["Perfil Admin", "Editar Pacientes", "Editar Doctores","UsuariosEliminados"];

  const handleClick = (event) => {
    const index = views.findIndex((el) => el === event.target.innerHTML);
    // console.log(event.target.innerHTML);
    console.log(index);
    setVista(index);
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
            <Box
              sx={{
                height: "88vh",
                width: "150px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  backgroundColor: theme.palette.primary.main,
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
                      primary="Perfil Admin"
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
                    primary="Editar Pacientes"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Editar Doctores"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px" }}
                    primary="Usuarios Eliminados"
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
                justifyContent: "top",
                alignItems: "left",
              }}
            >
              {loading ? (
                <Loading />
              ) : (
                <>
                  {/* ACA VAN LOS  COMPONENTES QUE SE RENDERIZAN A LA IZQ DE LA LISTA */}
                  {vista === 0 ? (
                    "Admin General  A PENSARRR"
                  ) : vista === 1 ? (
                    <EditarPacientes />
                  ) : vista === 2 ? (
                    <EditarDoctores />
                  ) : vista === 3 ? (
                    <DetallePaciente />
                  ) : vista === 4 ? (
                    <DetalleDoctor />
                  ) : vista === 5 ?( 
                   <UsuariosEliminados />
                   ): vista === 6 }
                </>
              )}
            </Box>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Admin;
