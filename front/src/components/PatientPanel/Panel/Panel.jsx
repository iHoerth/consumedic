import React from "react";
import { useTheme } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import Loading from "../../Loading/Loading";
import PatientData from "../PatientData/PatientData";

import {
  Box,
  CardHeader,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const Panel = () => {
  const theme = useTheme();
  const { patientDetail, fetchPatientByEmail } = useContext(Context)[1];
  const { session } = useContext(Context)[2];
  const [loading, setLoading] = useState(true);
  const { nombre, apellido, email, dni, telefono } = patientDetail;

  useEffect(() => {
    fetchPatientByEmail(session.email);
  }, []);

  useEffect(() => {
    patientDetail.id && setLoading(false);
  }, [patientDetail]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Box
        container
        sx={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          height: "55rem",
          borderRadius: "10px",
          width: "80%",
          mt: "135px",
        }}
      >
        <Box sx={{ padding: "10px" }}>
          <Card
            sx={{
              width: "100%",
              bgcolor: theme.palette.primary.main,
              color: "white",
            }}
          >
            <CardHeader
              title={`Bienvenido ${nombre}`}
              subheader={email}
              sx={{
                color: "white",
              }}
            />
          </Card>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Card
            sx={{
              width: "20%",
              height: "80vh",
              marginRight: "10px",
              borderRadius: "10px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "10px",
                padding: "10px",
              }}
            >
              <Typography
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  bgcolor: theme.palette.primary.main,
                  width: "100%",
                }}
                color="white"
              >
                Datos Personales
              </Typography>
              <Box
                sx={{
                  marginTop: "20px",
                }}
              >
                <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
                  {nombre + " " + apellido}
                </Typography>
                <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
                  Dni: {dni}
                </Typography>
                <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
                  Telefono: {telefono}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Editar</Button>
            </CardActions>
          </Card>
          <Box sx={{ width: "80%" }}>
            <PatientData />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Panel;
