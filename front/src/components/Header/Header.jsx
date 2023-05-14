import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import VideocamIcon from "@mui/icons-material/Videocam";
import ApartmentIcon from "@mui/icons-material/Apartment";

const Header = () => {
  const theme = useTheme();

  return (
    <Box
    // color='secondary'
      sx={{
        bgcolor: theme.palette.secondary.main,
        width: "70%",
        p: "30px",
        mt: "10px",
        mb: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "15px",
        }}
      >
        Consumedic es una web para encontrar profesionales de la salud y agendar
        turnos al instante de manera simple y rápida. Busca el profesional que
        necesites ahora!
      </Typography>

      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          sx={{
            color: "secondary",
            fontWeight: 700,
            borderColor: "secondary",
            borderWidth: 2,
          }}
        >
          {" "}
          <VideocamIcon />
          En linea
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "secondary",
            fontWeight: 700,
            borderColor: "secondary",
            borderWidth: 2,
          }}
        >
          <ApartmentIcon />
          Presencial
        </Button>
      </Stack>
    </Box>
  );
};
export default Header;
