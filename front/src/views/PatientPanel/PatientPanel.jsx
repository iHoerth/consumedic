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
  console.log("patientDetail.email", patientDetail.email);

  useEffect(() => {
    if (session.email && !patientDetail.email) {
      setLoading(true);
      fetchPatientByEmail(session.email).then(() => {
        setLoading(false);
      });
      setLoading(false);
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
