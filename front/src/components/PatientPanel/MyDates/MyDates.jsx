import { useEffect, useContext, useState } from 'react';
import { Context } from '../../../context/ContextProvider';
import Loading from '../../Loading/Loading';
import { useTheme } from '@mui/material';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyDates = () => {
  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  function nuevoTurno() {
    navigate('/search');
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
      cita.descripcion ? cita.descripcion : 'No hay descripción'
    );
    const respuestasMedico = citas.map((cita) =>
      cita.respuestaMedico ? cita.respuestaMedico : 'No hay informe médico'
    );

    const especialidadName = especialidades.map((especialidad) => especialidad.especialidad);

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
        <Loading />
      ) : (
        <>
          <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary" align="center">
            Historial de Citas
          </Typography>

          {!informacion.length ? (
            <>
              <Typography variant="body1" align="center">
                No hay citas para mostrar en este momento.
              </Typography>
              <Button
                onClick={(event) => nuevoTurno(event)}
                variant="contained"
                sx={{
                  margin: '10px auto',
                  width: '200px',
                }}
              >
                Nuevo turno
              </Button>
            </>
          ) : (
            <>
              <TableContainer component={Paper} style={{ maxHeight: 400 }}>
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
                    {informacionData
                      .sort(function (a, b) {
                        var dateA = new Date(a.fecha[0] + ' ' + a.hora[0]);
                        var dateB = new Date(b.fecha[0] + ' ' + b.hora[0]);
                        return dateA - dateB;
                      })
                      .map((row) =>
                        Array.isArray(row.fecha) ? (
                          row.fecha.map((fecha,index) => (
                            <TableRow key={row.id}>
                              <TableCell>{fecha}</TableCell>
                              <TableCell>{row.hora[index]}</TableCell>
                              <TableCell>{row.nombre + ' ' + row.apellido}</TableCell>
                              <TableCell>{row.especialidad}</TableCell>
                              <TableCell>{row.descripcion}</TableCell>
                              <TableCell>{row.respuestaMedico}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow key={row.id}>
                            <TableCell>{row.fecha}</TableCell>
                            <TableCell>{row.hora}</TableCell>
                            <TableCell>{row.nombre + ' ' + row.apellido}</TableCell>
                            <TableCell>{row.especialidad}</TableCell>
                            <TableCell>{row.descripcion}</TableCell>
                            <TableCell>{row.respuestaMedico}</TableCell>
                          </TableRow>
                        )
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