import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Panel from "../../components/PatientPanel/Panel/Panel";
import { Box } from "@mui/material";

const PatientPanel = () => {
  return (
    <>
      <NavBar />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          pb: "25px",
        }}
      >
        <Panel />
      </Box>
      <Footer />
    </>
  );
};

export default PatientPanel;
