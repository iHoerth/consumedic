import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const MyDates = () => {
  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      {loading ? (
        <div>Cargando</div>
      ) : (
        <>
          <Typography
            sx={{ mb: 1.5, p: 1 }}
            color="text.secondary"
            align="center"
          >
            Historial de Citas
          </Typography>

          <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            {!informacion.length ? (
              <Typography variant="body1" align="center">
                No hay citas para mostrar
              </Typography>
            ) : (
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
                  {informacionData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.fecha}</TableCell>
                      <TableCell>{row.hora}</TableCell>
                      <TableCell>{row.nombre + " " + row.apellido}</TableCell>
                      <TableCell>{row.especialidad}</TableCell>
                      <TableCell>{row.descripcion}</TableCell>
                      <TableCell>{row.respuestaMedico}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </>
      )}
    </>
  );
};

export default MyDates;
