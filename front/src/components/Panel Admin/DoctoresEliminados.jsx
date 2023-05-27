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
        alert("El doctor ha sido restaurado exitosamente.");
      })
      .catch((error) => {
        console.log("Error al restaurar el doctor:", error);
        // Manejar el error de eliminación del paciente
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
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "1px 0 0px 0",
        }}
      >
        <Typography
          style={{
            fontSize: "larger",
            fontWeight: "600",
            backgroundColor: "#009BFF",
          }}
        >
          Listado de Doctores Eliminados
        </Typography>
      </Box>
      <Divider />
      <Container>
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
              {currentItems.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell align="left">
                    {doctor.nombre} {doctor.apellido}
                  </TableCell>
                  <TableCell align="center">{doctor.email}</TableCell>
                  <TableCell align="center">{doctor.doctord}</TableCell>
                  <TableCell align="center">{doctor.telefono}</TableCell>
                  <TableCell align="center">
                    <Button
                      id={doctor.email}
                      onClick={() => handleClick(doctor)}
                      variant="outlined"
                      size="small"
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
          />
        </Box>
      </Container>
    </>
  );
};
export default DoctoresEliminados;
