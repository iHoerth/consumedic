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
  Stack,
  Divider,
  Typography,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PacientesEliminados = () => {
  const {
    fetchPatients,
    deletedPatient,
    fetchSoftDeletedPatient,
    fetchPatientByEmail,
    restorePatient,
    setPaciente,
  } = useContext(Context)[1];
  const { setVista, setEmail } = useContext(Context)[6];
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [fetched, setfetched] = useState(false);

  useEffect(() => {
    if (deletedPatient.length === 0 && !fetched) {
      fetchSoftDeletedPatient();

      setfetched(true);
    } else {
      setLoading(false);
    }
  }, [...deletedPatient]);

  useEffect(() => {
    const filtered = deletedPatient.filter((paciente) =>
      paciente.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchQuery, deletedPatient]);

  const handleClick = (paciente) => {
    // const email = event.target.id;
    // fetchPatientByEmail(email);
    // setEmail(email);
    setPaciente(paciente);
    setVista(5);
  };

  const handleClickRestore = (id) => {
    restorePatient(id)
      .then(() => {
        // Eliminación exitosa, actualizar la lista de pacientes
        fetchSoftDeletedPatient();
        fetchPatients();
        alert("El paciente ha sido restaurado exitosamente.");
      })
      .catch((error) => {
        console.log("Error al restaurar el paciente:", error);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
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
          Listado de Pacientes Eliminados
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
                      onClick={() => handleClick(paciente)}
                      variant="outlined"
                      size="small"
                      style={{
                        marginRight: "40px",
                      }}
                    >
                      Acceder
                    </Button>
                    <Button
                      id={paciente.id}
                      onClick={() => handleClickRestore(paciente.id)}
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
export default PacientesEliminados;
