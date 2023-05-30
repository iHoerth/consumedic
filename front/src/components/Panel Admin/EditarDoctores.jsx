import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import TextField from "@mui/material/TextField";
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
  Stack,
  Divider,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const EditarDoctores = () => {
  const {
    doctors,
    fetchDoctors,
    fetchDoctorByEmail,
    deleteDoctor,
    fetchSoftDeletedDoctor,
  } = useContext(Context)[0];
  const { setVista, setEmail } = useContext(Context)[6];

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [fetched, setfetched] = useState(false);

  //Alerts
  const [snackOk, setSnackOk] = useState(false);
  const [snackFail, setSnackFail] = useState(false);
  const [snackOkMensaje, setSnackOkMensaje] = useState("");
  const [snackFailMensaje, setSnackFailMensaje] = useState("");

  // ...

  useEffect(() => {
    if (doctors.length === 0 && !fetched) {
      fetchDoctors();
      setfetched(true);
    } else {
      setLoading(false);
    }
  }, [doctors]);

  useEffect(() => {
    // filtro para buscar por nombre
    const filtered = doctors.filter((doctor) =>
      doctor.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const handleClick = (event) => {
    const email = event.target.id;
    fetchDoctorByEmail(email);
    setEmail(email);
    setVista(6);
  };

  const handleClickDelete = (id) => {
    deleteDoctor(id)
      .then(() => {
        // Eliminación exitosa, actualizar la lista de doctores
        fetchDoctors();
        fetchSoftDeletedDoctor();
        setSnackOkMensaje("La eliminación del doctor fue exitosa!");
        setSnackOk(true);
      })
      .catch((error) => {
        console.log("Error al eliminar el doctor:", error);
        // Manejar el error de eliminación del doctor
        setSnackFailMensaje("No se ha podido eliminar el doctor!");
        setSnackFail(true);
      });
  };

  // Lógica para la paginación
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
          Listado de Doctores
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
            }} // Cambia el color del campo de búsqueda
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
                <TableCell align="center">Teléfono</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell align="left">{`${doctor.nombre} ${doctor.apellido}`}</TableCell>
                    <TableCell align="center">{doctor.email}</TableCell>
                    <TableCell align="center">{doctor.id}</TableCell>
                    <TableCell align="center">{doctor.telefono}</TableCell>
                    <TableCell align="center">
                      <Button
                        id={doctor.email}
                        onClick={handleClick}
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
                        onClick={() => handleClickDelete(doctor.id)}
                        variant="outlined"
                        color="warning"
                        size="small"
                      >
                        X
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!loading && (
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
        )}
      </Container>
    </>
  );
};

export default EditarDoctores;
