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
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const EditarPacientes = () => {
  const { patients, fetchPatients, fetchPatientByEmail, deletePatient } =
    useContext(Context)[1];
  const { setVista, setEmail } = useContext(Context)[6];

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (patients.length === 0) {
      fetchPatients();
    } else {
      setLoading(false);
    }
  }, [patients]);

  useEffect(() => {
    const filtered = patients.filter((paciente) =>
      paciente.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchQuery, patients]);

  const handleClick = (event) => {
    const email = event.target.id;
    fetchPatientByEmail(email);
    setEmail(email);
    setVista(3);
  };

  const handleClickDelete = (id) => {
    deletePatient(id)
      .then(() => {
        // Eliminación exitosa, actualizar la lista de pacientes
        fetchPatients();
      })
      .catch((error) => {
        console.log("Error al eliminar el paciente:", error);
        // Manejar el error de eliminación del paciente
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "0px 0 10px 0",
        }}
      >
        <Typography
          style={{
            fontSize: "larger",
            fontWeight: "600",
            backgroundColor: "#009BFF",
          }}
        >
          Listado de Pacientes
        </Typography>
      </Box>
      <Divider />
      <Container>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre"
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "#009BFF" }}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
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
              {currentItems.map((paciente) => (
                <TableRow key={paciente.id}>
                  <TableCell align="left">
                    {paciente.nombre} {paciente.apellido}
                  </TableCell>
                  <TableCell align="center">{paciente.email}</TableCell>
                  <TableCell align="center">{paciente.id}</TableCell>
                  <TableCell align="center">{paciente.telefono}</TableCell>
                  <TableCell align="center">
                    <Button
                      id={paciente.email}
                      onClick={handleClick}
                      variant="outlined"
                      size="small"
                    >
                      Acceder
                    </Button>
                    <Button
                      id={paciente.id}
                      onClick={() => handleClickDelete(paciente.id)}
                      variant="outlined"
                      color="warning"
                      size="small"
                    >
                      X
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
          />
        </Box>
      </Container>
    </>
  );
};

export default EditarPacientes;
