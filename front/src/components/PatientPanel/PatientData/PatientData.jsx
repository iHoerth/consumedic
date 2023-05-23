import Box from "@mui/material/Box";
import { Stack, Divider, Card } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import MyDoctors from "../MyDoctors/MyDoctors";
import MyDates from "../MyDates/MyDates";
import MyDocuments from "../MyDocuments/MyDocuments";
import EditProfile from "../EditProfile/EditProfile";
import { useTheme } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../../context/ContextProvider";
import Loading from "../../../components/Loading/Loading";

const PatientData = () => {
  const theme = useTheme();
  const [value, setValue] = useState("1");
  const { vista, setVista } = useContext(Context)[3];
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const views = ["Mis Medicos", "Mis Citas", "Mis Documentos", "Editar Perfil"];
  const handleClick = (event) => {
    const index = views.findIndex((el) => el === event.target.innerHTML);
    console.log(index);
    setVista(index);
  };

  return (
    <Card maxWidth="sm" sx={{ mb: "40px" }}>
      <Box sx={{ height: "55vh" }}>
        <Stack
          direction="row"
          sx={{
            border: "1px solid",
            borderColor: "#bababa",
            height: "60vh",
            width: "100%",
          }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box
            sx={{
              height: "60vh",
              width: "200px",
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
                    sx={{ m: "0px", color: "white", padding: "10px" }}
                    primary="Mis Medicos"
                    onClick={handleClick}
                  />
                </ListItemButton>
              }
            >
              <Divider />
              <ListItemButton>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  sx={{ m: "0px", color: "white", padding: "10px" }}
                  primary="Mis Citas"
                  onClick={handleClick}
                />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  sx={{ m: "0px", color: "white", padding: "10px" }}
                  primary="Mis Documentos"
                  onClick={handleClick}
                />
              </ListItemButton>

              <Divider />
              <Divider />
              <ListItemButton>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  sx={{ m: "0px", color: "white", padding: "10px" }}
                  primary="Editar Perfil"
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
            {/* ACA VAN LOS  COMPONENTES QUE SE RENDERIZAN A LA DERECHA DE LA LISTA */}
            {vista === 0 ? (
              <MyDoctors />
            ) : vista === 1 ? (
              <MyDates />
            ) : vista === 2 ? (
              <MyDocuments />
            ) : vista === 3 ? (
              <EditProfile />
            ) : null}
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};

export default PatientData;
