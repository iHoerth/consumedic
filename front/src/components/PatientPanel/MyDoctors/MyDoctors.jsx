import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { DataGrid } from "@material-ui/data-grid";
import { Icon } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Skeleton,
  Modal,
  Button,
  TextField,
  Rating,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";

const MyDoctors = () => {
  const theme = useTheme();
  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { deleteAppointmentById } = useContext(Context)[4];
  const { opinions, getOpinionsByPaciente, postOpinions, patientDetail } =
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

  useEffect(() => {
    setLoading(true);
    fetchPatientData(patientDetail.id);
    getOpinionsByPaciente(patientDetail.id);
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

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
      editable: true,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 150,
      editable: true,
    },
    {
      field: "especialidad",
      headerName: "Especialidad",
      width: 150,
      editable: true,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      editable: true,
    },
    {
      field: "opinion",
      headerName: "Agregar Opinión",
      width: 180,
      editable: true,
      renderCell: (params) => (
        <Icon>
          {opinionsSent[params.row.id] ? (
            <CheckCircle
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          ) : (
            <EditIcon
              sx={{
                color: theme.palette.primary.main,
              }}
              variant="contained"
              onClick={() => handleOpenModal(params.row.id)}
            />
          )}
        </Icon>
      ),
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          startIcon={
            <DeleteIcon
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          }
          onClick={() => {
            handleDelete(params.row.idCita);
            setAppointments(
              appointments.filter(
                (item) => item.Cita[0].id !== params.row.idCita
              )
            );
          }}
        ></Button>
      ),
    },
  ];

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
      apellido: item.apellido,
      especialidad: especialidadName,
      nombre: item.nombre,
      telefono: item.telefono,
      email: item.email,
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
      alert("Por favor, complete todos los campos");
      return;
    } else if (opinionsSent[selectedId]) {
      alert("Ya has enviado una opinión a este médico.");
      return;
    } else {
      postOpinions({ ubicacion, puntaje, mensaje, idMedico, idPaciente })
        .then((data) => {
          alert(data.message);
          setOpinionsSent((prevOpinionsSent) => ({
            ...prevOpinionsSent,
            [selectedId]: true,
          }));
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleDelete = (citaId) => {
    deleteAppointmentById(citaId)
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      {loading ? (
        <div>Cargando</div>
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
              Registro de Medicos consultados
            </Typography>
          </Box>

          {!informacion.length ? (
            <>
              <Skeleton>No hay registros para mostrar</Skeleton>
            </>
          ) : (
            <>
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
              <DataGrid
                disableSelectionOnClick
                rows={informacionData}
                columns={columns}
                pageSize={5}
                checkboxSelection
                rowsPerPageOptions={[5, 10, 20]}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
};
export default MyDoctors;
