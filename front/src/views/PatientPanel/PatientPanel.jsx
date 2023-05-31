/*import NavBar from "../../components/NavBar/NavBar";
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

  //
  const { fetchPatientData } = useContext(Context)[5];
  const { getOpinionsByPaciente } = useContext(Context)[1];

  useEffect(() => {
    setLoading(true);
    session.email &&
      fetchPatientByEmail(session.email).then(() => setLoading(false));
  }, [session.email]);

  useEffect(() => {
    setLoading(true);
    fetchPatientData(patientDetail.id);
    getOpinionsByPaciente(patientDetail.id);
    setLoading(false);
  }, [patientDetail.id]);

  console.log(patientDetail, "paciente ");
  console.log(patientDetail.id, "paciente.id ");

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

export default PatientPanel;*/

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Panel from "../../components/PatientPanel/Panel/Panel";
import { Box, Container, Stack, Divider } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import Loading from "../../components/Loading/Loading";

const PatientPanel = () => {
  const { session } = useContext(Context)[2];
  const { fetchPatientByEmail, patientDetail, getOpinionsByPaciente } =
    useContext(Context)[1];
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false); // Variable de estado adicional

  const { fetchPatientData } = useContext(Context)[5];

  useEffect(() => {
    setLoading(true);
    session.email &&
      fetchPatientByEmail(session.email).then(() => setLoading(false));
  }, [session.email]);

  useEffect(() => {
    if (patientDetail.id) {
      setLoading(true);
      fetchPatientData(patientDetail.id);
      getOpinionsByPaciente(patientDetail.id);
      setLoading(false);
      setDataLoaded(true); // Marcar los datos como cargados
    }
  }, [patientDetail.id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <Container maxWidth="sm" sx={{ mt: "100px", mb: "40px" }}>
            <Box sx={{ height: "85vh" }}>
              {dataLoaded ? ( // Verificar si los datos están cargados
                <Stack
                  direction="row"
                  sx={{ border: "1px solid", borderColor: "#bababa" }}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Panel />
                </Stack>
              ) : (
                <Loading /> // Mostrar el indicador de carga mientras se obtienen los datos
              )}
            </Box>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default PatientPanel;
