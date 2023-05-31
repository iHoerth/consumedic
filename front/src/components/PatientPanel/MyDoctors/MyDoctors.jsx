import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { Edit as EditIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckCircle } from "@mui/icons-material";
import Loading from "../../Loading/Loading";
import {
  Box,
  Modal,
  Button,
  TextField,
  Rating,
  Paper,
  Avatar,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const MyDoctors = () => {
  const theme = useTheme();
  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { deleteAppointmentById } = useContext(Context)[4];
  const { opinions, postOpinions, patientDetail, getOpinionsByPaciente } =
    useContext(Context)[1];
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [infoData, setInfoData] = useState([]);
  const [opinionsSent, setOpinionsSent] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [opinionText, setOpinionText] = useState({
    opinion: "",
    rating: 0,
  });

  //alerts
  const [snackOk, setSnackOk] = useState(false);
  const [snackFail, setSnackFail] = useState(false);
  const [snackInfo, setSnackInfo] = useState(false);
  const [snackOkMensaje, setSnackOkMensaje] = useState("");
  const [snackFailMensaje, setSnackFailMensaje] = useState("");
  const [snackInfoMensaje, setSnackInfoMensaje] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchPatientData(patientDetail.id).then(() => {
      setLoading(false);
    });

    if (!!informacion.length) {
      setLoading(false);
    }
  }, [patientDetail.id]);

  useEffect(() => {
    if (!!informacion.length) {
      setAppointments(informacion);
      setLoading(false);
    }
  }, [informacion]);

  useEffect(() => {
    const opinionsSent = opinions.reduce((acc, opinion) => {
      const doctorId = opinion.DoctorType.id;
      acc[doctorId] = true;
      return acc;
    }, {});
    setOpinionsSent(opinionsSent);
  }, [opinions]);

  const direccion = informacion.map((item) => {
    if (item.id === selectedId) {
      return item.direccion;
    }
    return null;
  });

  let ubicacion = null;

  direccion.forEach((valor) => {
    if (valor !== null) {
      ubicacion = valor;
      return;
    }
  });

  const informacionData = appointments.map((item) => {
    const especialidades = item.Especialidads.map((especialidad) => ({
      especialidad: especialidad.name,
    }));

    const especialidadName = especialidades.map(
      (especialidad) => especialidad.especialidad
    );
    return {
      idCita: item.Cita[0].id,
      id: item.id,
      imagen: item.imagen,
      precio: item.precio,
      apellido: item.apellido,
      especialidad: especialidadName,
      nombre: item.nombre,
      telefono: item.telefono,
      email: item.email,
      direccion: item.direccion,
      opinion: "",
    };
  });

  const handleOpenModal = (doctorId) => {
    setSelectedId(doctorId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddOpinion = () => {
    const updatedInformacionData = infoData.map((item) => {
      if (item.id === selectedId) {
        return { ...item, opinion: opinionText };
      }
      return item;
    });

    setInfoData(updatedInformacionData);

    handleCloseModal();
    setOpinionText({});

    const puntaje = opinionText.rating;
    const mensaje = opinionText.opinion;
    const idMedico = selectedId;
    const idPaciente = patientDetail.id;

    if (
      opinionText.rating === 0 ||
      !opinionText.opinion ||
      opinionText.opinion.trim() === ""
    ) {
      setSnackInfoMensaje("Por favor, complete todos los campos");
      setSnackInfo(true);
      return;
    } else if (opinionsSent[selectedId]) {
      setSnackInfoMensaje("Ya has enviado una opinión a este médico.");
      setSnackInfo(true);
      return;
    } else {
      postOpinions({ ubicacion, puntaje, mensaje, idMedico, idPaciente })
        .then((data) => {
          setSnackOkMensaje("Opinion Registrada! Ver en Opiniones");
          setSnackOk(true);
          setOpinionsSent((prevOpinionsSent) => ({
            ...prevOpinionsSent,
            [selectedId]: true,
          }));
          getOpinionsByPaciente(patientDetail.id);
        })
        .catch((error) => {
          setSnackFailMensaje("No se ha podido registrar la opinion");
          setSnackFail(true);
        });
    }
  };

  const handleDelete = (citaId) => {
    deleteAppointmentById(citaId)
      .then((data) => {
        setSnackOkMensaje("Eliminado con exito!");
        setSnackOk(true);
        fetchPatientData(patientDetail.id);
      })
      .catch((error) => {
        setSnackFailMensaje("No se ha podido eliminar el doctor");
        setSnackFail(true);
      });
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
            Historial de Medicos Consultados
          </Typography>

          {!informacionData.length ? (
            <Typography variant="body1" align="center">
              No hay medicos consultados para mostrar en este momento.
            </Typography>
          ) : (
            <>
              <TableContainer component={Paper} style={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Médico</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Telefono</TableCell>
                      <TableCell>Ubicación</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell align="center">Agregar opinion</TableCell>
                      <TableCell align="center">Eliminar Doctor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {informacionData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar src={item.imagen} alt="img" />
                            <Typography variant="subtitle1" marginLeft={"10px"}>
                              {item.nombre + " " + item.apellido}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.telefono}</TableCell>
                        <TableCell>{item.direccion}</TableCell>
                        <TableCell>$ {item.precio}</TableCell>
                        <TableCell align="center">
                          {opinionsSent[item.id] ? (
                            <CheckCircle
                              sx={{
                                color: theme.palette.primary.main,
                              }}
                              onClick={() => {
                                setSnackInfoMensaje(
                                  "Ya has enviado una opinión a este médico."
                                );
                                setSnackInfo(true);
                              }}
                            />
                          ) : (
                            <EditIcon
                              sx={{
                                color: theme.palette.primary.main,
                              }}
                              variant="contained"
                              onClick={() => handleOpenModal(item.id)}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            startIcon={
                              <DeleteIcon
                                sx={{
                                  color: theme.palette.primary.main,
                                }}
                              />
                            }
                            onClick={() => {
                              handleDelete(item.idCita);
                              setAppointments(
                                appointments.filter(
                                  (item) => item.Cita[0].id !== item.idCita
                                )
                              );
                            }}
                          ></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Modal open={openModal} onClose={handleCloseModal}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      border: "2px solid #000",
                      boxShadow: 24,
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: 30,
                        pl: 2,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: "10px",
                        p: "25px",
                        width: "100%",
                      }}
                    >
                      {informacion.map((item) => {
                        if (item.id === selectedId) {
                          return <Avatar src={item.imagen}></Avatar>;
                        }
                      })}
                      {informacion.map((item) => {
                        if (item.id === selectedId) {
                          return (
                            <Typography
                              sx={{
                                color: "white",
                                pl: "30px",
                              }}
                            >
                              {item.nombre + " " + item.apellido}
                            </Typography>
                          );
                        }
                      })}
                    </Paper>
                    <Rating
                      sx={{
                        color: theme.palette.primary.main,
                        mt: "20px",
                        mb: "20px",
                      }}
                      name="rating"
                      value={opinionText.rating}
                      onChange={(event, newValue) =>
                        setOpinionText((prevOpinionText) => ({
                          ...prevOpinionText,
                          rating: newValue,
                        }))
                      }
                    />

                    <TextField
                      label="Opinión"
                      multiline
                      rows={4}
                      value={opinionText.opinion}
                      onChange={(e) =>
                        setOpinionText((prevOpinionText) => ({
                          ...prevOpinionText,
                          opinion: e.target.value,
                        }))
                      }
                      fullWidth
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleAddOpinion}
                      style={{
                        padding: "8px",
                        margin: "20px",
                        color: "white",
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: "10px",
                      }}
                    >
                      Agregar opinion
                    </Button>
                  </Box>
                </Modal>
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
                <Snackbar
                  open={snackInfo}
                  autoHideDuration={2500}
                  onClose={() => {
                    setSnackInfo(false);
                    setSnackInfoMensaje("");
                  }}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert severity="info" variant="filled">
                    <AlertTitle>Mensaje de Informacion</AlertTitle>
                    {snackInfoMensaje}
                  </Alert>
                </Snackbar>
              </TableContainer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyDoctors;
