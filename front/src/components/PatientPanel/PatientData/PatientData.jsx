import { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import MyDates from "../MyDates/MyDates";

const PatientData = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        width: "100%",
        height: "80vh",
        backgroundColor: "white",
        p: "10px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs example"
        sx={{}}
      >
        <Tab label="Mis Citas" value="1" />
        <Tab label="Mi Historial" value="2" />
        <Tab label="Medicos" value="3" />
      </Tabs>
      {value === "1" && (
        <Box value="1">
          Tabla de citas
          <MyDates />
        </Box>
      )}
      {value === "2" && <Box value="2">Tabla con las historias</Box>}
      {value === "3" && (
        <Box value="3">todos los medicos con lo que se atendio</Box>
      )}
    </Box>
  );
};

export default PatientData;
