import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import { Context } from "../../../context/ContextProvider";
import { useEffect, useContext, useState } from "react";
import { useTheme } from "@mui/material";
import Loading from "../../Loading/Loading";

const MyOpinions = () => {
  const {
    opinions,
    getOpinionsByPaciente,
    fetchPatientByEmail,
    patientDetail,
  } = useContext(Context)[1];
  const { session } = useContext(Context)[2];
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { values } = theme.breakpoints;

  useEffect(() => {
    const fetchData = async () => {
      await fetchPatientByEmail(session.email);
      await getOpinionsByPaciente(patientDetail.id);
      setLoading(false);
    };

    fetchData();
  }, [patientDetail.id, session.email]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
              Historial de Opiniones Realizadas
            </Typography>
          </Box>

          {!opinions.length ? (
            <Typography variant="body1" align="center">
              No hay opiniones disponibles en este momento para mostrar.
            </Typography>
          ) : (
            <>
              <TableContainer component={Paper}
                sx={{
                  width: {
                    desktop: '100%',
                    laptop: '99.5%',
                    tablet: '99.5%',
                    mobile: '99.5%',
                  },
                  height: {
                    desktop: '80%',
                    laptop: '100%',
                    tablet: '100%',
                    mobile: '130%',
                  }
                }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre del Medico</TableCell>
                      <TableCell>Ubicacion</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Opinion</TableCell>
                      <TableCell>Estrellas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {opinions.reverse().map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          {row.DoctorType.nombre +
                            " " +
                            row.DoctorType.apellido}
                        </TableCell>
                        <TableCell>{row.ubicacion}</TableCell>
                        <TableCell>{row.fecha}</TableCell>
                        <TableCell>{row.mensaje}</TableCell>
                        <TableCell>
                          <Rating
                            name="stars"
                            sx={{ color: theme.palette.primary.main }}
                            value={row.puntaje}
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default MyOpinions;
