
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import Loading from "../../Loading/Loading";
import { useTheme } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Typography,
  Button,
  styled
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
const MyDates = () => {

  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);
 
  const theme = useTheme();
  const { values } = theme.breakpoints;
  const navigate = useNavigate();
  const StyledTableContainer = styled(TableContainer)`
  overflow-x: auto;
  max-width: 100%;
`;
  function nuevoTurno() {
    navigate("/search");
  }
  useEffect(() => {
    setLoading(true);
    fetchPatientData(patientDetail.id).then(() => {
      setLoading(false);
    });

    if (!!informacion.length) {
      setLoading(false);
    }
  }, [patientDetail.id]);

  const informacionData = informacion.map((item) => {
    const citas = item.Cita.map((cita) => ({
      fecha: cita.fecha,
      hora: cita.hora,
      descripcion: cita.descripcion,
      respuestaMedico: cita.respuestaMedico,
    }));

    const especialidades = item.Especialidads.map((especialidad) => ({
      especialidad: especialidad.name,
    }));

    const fechas = citas.map((cita) => cita.fecha);
    const horas = citas.map((cita) => cita.hora);
    const descripciones = citas.map((cita) =>
      cita.descripcion ? cita.descripcion : "No hay descripción"
    );
    const respuestasMedico = citas.map((cita) =>
      cita.respuestaMedico ? cita.respuestaMedico : "No hay informe médico"
    );

    const especialidadName = especialidades.map(
      (especialidad) => especialidad.especialidad
    );

    return {
      id: item.id,
      apellido: item.apellido,
      nombre: item.nombre,
      especialidad: especialidadName,
      fecha: fechas,
      hora: horas,
      descripcion: descripciones,
      respuestaMedico: respuestasMedico,
    };
  });

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5; // Cantidad de filas por página

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const totalPages = Math.ceil(informacionData.length / rowsPerPage);

  const renderTableRows = () => {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return informacionData.slice(startIndex, endIndex).map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.fecha}</TableCell>
        <TableCell>{row.hora}</TableCell>
        <TableCell>{row.nombre + ' ' + row.apellido}</TableCell>
        <TableCell>{row.especialidad}</TableCell>
        <TableCell>{row.descripcion}</TableCell>
        <TableCell>{row.respuestaMedico}</TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Typography
            sx={{ mb: 1.5, p: 1 }}
            color="text.secondary"
            align="center"
          >
            Historial de Citas
          </Typography>

          {!informacion.length ? (
            <>
              <Typography variant="body1" align="center">
                No hay citas para mostrar en este momento.
              </Typography>
              <Button
                onClick={(event)=>nuevoTurno(event)}
                variant="contained"
                sx={{
                  margin: '10px auto',
                  width: '200px'
                }}>Nuevo turno</Button>
            </>
          ) : (
            <>
              <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Nombre del Medico</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Informe médico</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {informacionData.length > 0 && (
            <React.Fragment>
              {renderTableRows()}
              {informacionData.length > rowsPerPage && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <IconButton
                      disabled={currentPage === 0}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <Typography variant="body2" component="span">
                      {currentPage + 1} / {totalPages}
                    </Typography>
                    <IconButton
                      disabled={currentPage === totalPages - 1}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          )}
        </TableBody>
      </Table>
    </TableContainer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyDates;
