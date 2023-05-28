import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Panel from "../../components/PatientPanel/Panel/Panel";
import { Box, Container, Stack, Divider } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import Loading from "../../components/Loading/Loading";

const PatientPanel = () => {
  const { session } = useContext(Context)[2];
  const { fetchPatientByEmail, patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    session.email &&
      fetchPatientByEmail(session.email).then(() => setLoading(false));
  }, [session.email]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <Container maxWidth="sm" sx={{ mt: "100px", mb: "40px" }}>
            <Box sx={{ height: "85vh" }}>
              <Stack
                direction="row"
                sx={{ border: "1px solid", borderColor: "#bababa" }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Panel />
              </Stack>
            </Box>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default PatientPanel;
