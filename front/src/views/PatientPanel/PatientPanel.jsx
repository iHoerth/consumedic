import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Panel from "../../components/PatientPanel/Panel/Panel";
import { Box } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";

const PatientPanel = () => {
  const { session } = useContext(Context)[2];
  const { fetchPatientByEmail, patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session.email && !patientDetail.email) {
      const search = async () => {
        await fetchPatientByEmail(session.email);
      };
      search();
    } else {
      setLoading(false);
    }
  }, [loading, patientDetail]);

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
