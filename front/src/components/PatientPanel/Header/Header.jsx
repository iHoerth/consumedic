import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Context } from "../../../context/ContextProvider";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const Header = () => {
  const theme = useTheme();
  
  const { values } = theme.breakpoints;
  const { patientDetail } = useContext(Context)[1];

  const { nombre, apellido, email, dni, telefono, ObraSocial } = patientDetail;

  return (
    <>
      <Box
        sx={{
          margin:'auto',
          display: "flex",
          flexDirection: "column",
          justifyContent: "normal",
          alignItems: "stretch",
          borderRadius: "10px",
          width: {
            desktop: values.desktop,
            laptop: '99.5%',
            tablet: '99.5%',
            mobile: '99.5%',
          },
        }}
      >
        <Card
          sx={{
            bgcolor: theme.palette.primary.dark,
            color: "white",
            display: "flex",
            flexDirection: {
              mobile: 'column',
              tablet: 'row',
              laptop: 'row',
              desktop: 'row',
            },
            alignItems:'center',
            justifyContent: "space-between",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <CardHeader
            title={`Bienvenido ${nombre}`}
            subheader={email}
            sx={{
              color: "white",
              // width: {
              //   desktop: values.desktop,
              //   laptop: '99.5%',
              //   tablet: '99.5%',
              //   mobile: '99.5%',
              // }, 
              margin:'auto',
            }}
          />
          <Card
            sx={{
              // width: "40%",
              // height: "18vh",
              // marginRight: "10px",
              // backgroundColor:'red',
              borderRadius: "10px",
              height: {
                mobile: '20%',
                tablet: '90%',
                laptop: '70%',
                desktop: '90%',
              },
              width: {
                mobile: '48%',
                tablet: '50%',
                laptop: '37%',
                desktop: '50%',
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "10px",
                padding: "10px",
                bgcolor: theme.palette.primary.main,
              }}
            >
              <Typography
                sx={{
                  padding: "12px",
                  borderRadius: "10px",
                  width: "100%",
                  color: "white",
                }}
              >
                <b>Datos Personales</b>
              </Typography>
              <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
                {nombre + " " + apellido}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Divider orientation="vertical" flexItem />
                <Typography
                  sx={{ paddingLeft: "10px", paddingRight: "20px" }}
                  color="text.secondary"
                >
                  <b>Dni:</b> {dni}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography
                  sx={{ paddingLeft: "10px", paddingRight: "20px" }}
                  color="text.secondary"
                >
                  <b>Teléfono</b> {telefono}
                </Typography>
                <Divider orientation="vertical" flexItem />

                <Typography
                  sx={{ paddingLeft: "10px", paddingRight: "20px" }}
                  color="text.secondary"
                >
                  <b>Obra social:</b> {ObraSocial?.nombre}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        ></Box>
      </Box>
    </>
  );
};

export default Header;
