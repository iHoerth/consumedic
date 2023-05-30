import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Typography,
  Pagination,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const DoctoresEliminados = () => {
  const {
    fetchDoctors,
    deletedDoctor,
    fetchSoftDeletedDoctor,
    fetchDoctorByEmail,
    restoreDoctor,
    setDoctor,
  } = useContext(Context)[0];
  const { setVista, setEmail } = useContext(Context)[6];
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [fetched, setfetched] = useState(false);

  const [snackOk, setSnackOk] = useState(false);
  const [snackFail, setSnackFail] = useState(false);
  const [snackOkMensaje, setSnackOkMensaje] = useState("");
  const [snackFailMensaje, setSnackFailMensaje] = useState("");

  useEffect(() => {
    if (deletedDoctor.length === 0 && !fetched) {
      fetchSoftDeletedDoctor();

      setfetched(true);
    } else {
      setLoading(false);
    }
  }, [...deletedDoctor]);

  useEffect(() => {
    const filtered = deletedDoctor.filter((doctor) =>
      doctor.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, deletedDoctor]);

  const handleClick = (doctor) => {
    setDoctor(doctor);
    setVista(6);
  };

  const handleClickRestore = (id) => {
    restoreDoctor(id)
      .then(() => {
        // Eliminación exitosa, actualizar la lista de pacientes
        fetchSoftDeletedDoctor();
        fetchDoctors();
        setSnackOkMensaje("El doctor ha sido restaurado exitosamente.");
        setSnackOk(true);
      })
      .catch((error) => {
        console.log("Error al restaurar el doctor:", error);
        // Manejar el error de eliminación del paciente
        setSnackFailMensaje("No se ha podido restaurar el doctor!");
        setSnackFail(true);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Snackbar
        open={snackOk}
        autoHideDuration={2500}
        onClose={() => {
          setSnackOk(false);
          setSnackOkMensaje("");
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          <AlertTitle>Mensaje Exitoso</AlertTitle>
          {snackOkMensaje}
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackFail}
        autoHideDuration={2500}
        onClose={() => {
          setSnackFail(false);
          setSnackFailMensaje("");
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          <AlertTitle>Mensaje de Error</AlertTitle>
          {snackFailMensaje}
        </Alert>
      </Snackbar>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          aligenItems: "center",
          padding: "20px",
          backgroundColor: "#009BFF",
          borderRadius: "3px",
          marginRight: "16px",
          marginLeft: "16px",
          marginBottom: "30px",
        }}
      >
        <Typography
          style={{
            fontSize: "larger",
            fontWeight: "600",
            color: "white",
            marginTop: "10px",
          }}
        >
          Listado de Doctores Eliminados
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "0px",
          }}
        >
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre"
            size="small"
            sx={{
              border: "2px solid white",
              borderRadius: "3px",
              color: "white",
            }}
            InputProps={{
              endAdornment: <SearchIcon sx={{ color: "white" }} />,
            }}
          />
        </Box>
      </Box>

      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              style={{
                backgroundColor: "lightgray",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableRow>
                <TableCell align="left">Nombre y Apellido</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Telefono</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell align="left">
                    {doctor.nombre} {doctor.apellido}
                  </TableCell>
                  <TableCell align="center">{doctor.email}</TableCell>
                  <TableCell align="center">{doctor.id}</TableCell>
                  <TableCell align="center">{doctor.telefono}</TableCell>
                  <TableCell align="center">
                    <Button
                      id={doctor.email}
                      onClick={() => handleClick(doctor)}
                      variant="outlined"
                      size="small"
                      style={{
                        marginRight: "40px",
                      }}
                    >
                      Acceder
                    </Button>
                    <Button
                      id={doctor.id}
                      onClick={() => handleClickRestore(doctor.id)}
                      variant="outlined"
                      color="warning"
                      size="small"
                    >
                      Restaurar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          display="flex"
          justifyContent="center"
          marginTop="20px"
          marginBottom="10px"
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="small"
            color="primary"
          />
        </Box>
      </Container>
    </>
  );
};
export default DoctoresEliminados;
