import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context/ContextProvider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  Button,
  Box,
  Typography,
  Divider,
  Snackbar,
  Alert,
  AlertTitle,
  Modal,
} from '@mui/material';
import MailMensajePaciente from '../Mail/MailMensajePaciente';

const Turnos = ({ id }) => {
  const { turnos, fetchTurnos } = useContext(Context)[3];
  const { fetchPatientByEmail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(0);
  const { session } = useContext(Context)[2];
  const {
    mailDoctor,
    setMailDoctor,
    mailPaciente,
    setMailPaciente,
    modal,
    setModal,
    snackOk,
    setSnackOk,
    snackOkMensaje,
    setSnackOkMensaje,
    snackFail,
    setSnackFail,
    snackFailMensaje,
    setSnackFailMensaje,
  } = useContext(Context)[7];
  useEffect(() => {
    if (!turnos.viejosTurnos || !turnos.futurosTurnos) {
      const search = async () => {
        await fetchTurnos(id);
      };
      search();
    } else {
      setLoading(false);
    }
    // console.log(turnos);
  }, [loading]);

  const handleClick = (event) => {
    console.log(event.target);
  };

  const handleTurnoClick = (event) => {
    if (view === 0) {
      setView(1);
    } else setView(0);
  };
  return (
    <>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: '0px 0 10px 0',
        }}
      >
        <Typography style={{ fontSize: 'larger', fontWeight: '600' }}>Listado de Turnos</Typography>
        <Box sx={{ position: 'absolute', right: '10%', mb: '15px' }}>
          <Button variant="contained" color="secondary" size="small" onClick={handleTurnoClick}>
            {view === 0 ? 'Turnos Pasados' : 'Turnos por Venir'}
          </Button>
        </Box>
      </Box>
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            style={{ backgroundColor: 'lightgray', position: 'sticky', top: 0, zIndex: 1 }}
          >
            <TableRow>
              <TableCell key="nombre" align="left">
                Fecha
              </TableCell>
              <TableCell key="apellido" align="center">
                Hora
              </TableCell>
              <TableCell align="center">Paciente</TableCell>
              <TableCell align="center">Nota del Paciente</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {view === 0
              ? turnos.futurosTurnos && turnos.futurosTurnos.length
                ? turnos.futurosTurnos.map((turno) => (
                    <TableRow>
                      <TableCell align="left">{turno.fecha}</TableCell>
                      <TableCell align="center">{turno.hora}</TableCell>
                      <TableCell align="center">{`${turno.paciente.nombre} ${turno.paciente.apellido}`}</TableCell>
                      <TableCell align="center">{turno.descripcion}</TableCell>
                      <TableCell align="center">
                        <Button
                          id={turno.id}
                          onClick={async () => {
                            await fetchPatientByEmail(turno.paciente.email);
                            setModal(true);
                            console.log(turno.paciente.email);
                            setMailPaciente(turno.paciente.email);
                            setMailDoctor(session.email);
                          }}
                          color="secondary"
                          variant="outlined"
                          size="small"
                        >
                          Mensaje al Paciente
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : 'No hay turnos para mostrar'
              : turnos.viejosTurnos && turnos.viejosTurnos.length
              ? turnos.viejosTurnos.map((turno) => (
                  <TableRow>
                    <TableCell align="left">{turno.fecha}</TableCell>
                    <TableCell align="center">{turno.hora}</TableCell>
                    <TableCell align="center">{`${turno.paciente.nombre} ${turno.paciente.apellido}`}</TableCell>
                    <TableCell align="center">{turno.descripcion}</TableCell>
                    <TableCell align="center">
                      <Button
                        id={turno.id}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        disabled
                      >
                        Mensaje al Paciente
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : 'No hay turnos para mostrar'}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackOk}
        autoHideDuration={1500}
        onClose={() => {
          setSnackOk(false);
          setSnackOkMensaje('');
        }}
      >
        <Alert severity="success" variant="filled">
          <AlertTitle>Mensaje Exitoso</AlertTitle>
          {snackOkMensaje}
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackFail}
        autoHideDuration={1500}
        onClose={() => {
          setSnackFail(false);
          setSnackFailMensaje('');
        }}
      >
        <Alert severity="error" variant="filled">
          <AlertTitle>Mensaje de Error</AlertTitle>
          {snackFailMensaje}
        </Alert>
      </Snackbar>
      <Modal open={modal}>
        <Box
          sx={{
            position: 'absolute',
            width: '60%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <MailMensajePaciente />
        </Box>
      </Modal>
    </>
  );
};
export default Turnos;
