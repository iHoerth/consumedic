import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Panel from "../../components/PatientPanel/Panel/Panel";
import { Box } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";


const PatientPanel = () => {
  const { session } = useContext(Context)[2];
  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { fetchPatientByEmail, patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (session.email && !patientDetail.email) {
      const search = async () => {
        await fetchPatientByEmail(session.email);
      };
      search();
      // console.log(patientDetail);
    } else {
      setLoading(false);
    }
    if (patientDetail.id){
      // console.log(patientDetail.id);
      fetchPatientData(patientDetail.id)
    }

    
  }, [loading, patientDetail]);
  
  console.log(informacion);
  
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
