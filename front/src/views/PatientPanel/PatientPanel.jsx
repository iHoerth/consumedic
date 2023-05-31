import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import { useTheme } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Stack, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MyDoctors from "../../components/PatientPanel/MyDoctors/MyDoctors";
import MyOpinions from "../../components/PatientPanel/MyOpinions/MyOpinions";
import MyDates from "../../components/PatientPanel/MyDates/MyDates";
import EditProfile from "../../components/PatientPanel/EditProfile/EditProfile";
import Header from "../../components/PatientPanel/Header/Header";

const Admin = () => {
  const theme = useTheme();
  const { vista, setVista } = useContext(Context)[6];
  const { session } = useContext(Context)[2];
  const { fetchPatientByEmail, patientDetail, getOpinionsByPaciente } =
    useContext(Context)[1];
  const [dataLoaded, setDataLoaded] = useState(false); // Variable de estado adicional
  const { fetchPatientData } = useContext(Context)[5];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    session.email &&
      fetchPatientByEmail(session.email).then(() => setLoading(false));
  }, [session.email]);

  useEffect(() => {
    if (patientDetail.id) {
      setLoading(true);
      fetchPatientData(patientDetail.id);
      getOpinionsByPaciente(patientDetail.id);
      setLoading(false);
      setDataLoaded(true); // Marcar los datos como cargados
    }
  }, [patientDetail.id]);

  const views = ["Mis Doctores", "Mis Citas", "Editar Perfil", "Ver Opiniones"];

  const handleClick = (event) => {
    const index = views.findIndex((el) => el === event.target.innerHTML);
    setVista(index);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar variant='block' />
      <Container maxWidth="sm" sx={{ mt: "140px", mb: "40px", borderRadius:'5px' }}>
        <Box sx={{ height: "107vh" }}>
          <Header />
          <Stack
            direction="row"
            sx={{ border: "1px solid", borderColor: "#bababa", borderRadius:'5px', backgroundColor: theme.palette.background.main }}
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
                      sx={{ m: "0px", color: "white" }}
                      primary=""
                      onClick={handleClick}
                    />
                  </ListItemButton>
                }
              >
                <Divider />
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px", color: "white" }}
                    primary="Mis Doctores"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px", color: "white" }}
                    primary="Mis Citas"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px", color: "white" }}
                    primary="Editar Perfil"
                    onClick={handleClick}
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    sx={{ m: "0px", color: "white" }}
                    primary="Ver Opiniones"
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
                    <MyDoctors />
                  ) : vista === 1 ? (
                    <MyDates />
                  ) : vista === 2 ? (
                    <EditProfile />
                  ) : vista === 3 ? (
                    <MyOpinions />
                  ) : null}
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
