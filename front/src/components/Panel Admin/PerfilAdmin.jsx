import React from "react";
import { Typography, Box, Container } from "@mui/material";


const PerfilAdmin = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
   
        }}
      >
        <Box
          sx={{
            backgroundColor: "#2196f3",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom color="white">
            ¡Bienvenido al Perfil de Administrador!
          </Typography>
        </Box>
        <Typography variant="body1" component="p" align="center" color="black">
          Hola, aquí puedes administrar tus opciones y configuraciones.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
            style={{
              width: "400px",
              margin: "80px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <img
            src="https://img.freepik.com/fotos-premium/rayos-x-radiologia-medico-hospital-enfermedad-radiografia-rayos_488220-9872.jpg"
            style={{
              width: "400px",
              margin: "80px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <img
            src="https://s10.s3c.es/imag/_v0/770x420/3/9/f/600x400_hospital-pasillo-istock.jpg"
            style={{
              width: "400px",
              margin: "80px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          /> */}
        </Box>
      </Box>
    </Container>
  );
};

export default PerfilAdmin;

