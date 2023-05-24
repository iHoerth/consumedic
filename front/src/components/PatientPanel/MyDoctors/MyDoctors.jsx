import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { DataGrid } from "@material-ui/data-grid";
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
import { Icon } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material";

const MyDoctors = () => {
  const theme = useTheme();
  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { opinions, postOpinions, patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [opinionText, setOpinionText] = useState({
    opinion: "",
    rating: 0, // Valor inicial de rating
  });
  const [selectedId, setSelectedId] = useState(null); // Nuevo estado para almacenar el ID del doctor seleccionado
  const [infoData, setInfoData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchPatientData(patientDetail.id).then(() => {
      setLoading(false);
    });

    if (!!informacion.length) {
      setLoading(false);
    }
  }, [patientDetail.id]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
      width: 200,
      editable: true,
      renderCell: (params) => (
        <Icon>
          <EditIcon
            variant="contained"
            onClick={() => handleOpenModal(params.row.id)}
          />
        </Icon>
      ),
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      width: 150,
      editable: false,
      renderCell: (params) => <button>Eliminar</button>,
    },
  ];
  //onClick={() => handleDelete(params.row.id)}

  const informacionData = informacion.map((item) => {
    const especialidades = item.Especialidads.map((especialidad) => ({
      especialidad: especialidad.name,
    }));

    const especialidadName = especialidades.map(
      (especialidad) => especialidad.especialidad
    );
    return {
      id: item.id,
      apellido: item.apellido,
      especialidad: especialidadName,
      nombre: item.nombre,
      telefono: item.telefono,
      email: item.email,
      opinion: "", // Agregar una propiedad para almacenar la opinión del médico
    };
  });

  const handleOpenModal = (doctorId) => {
    setSelectedId(doctorId); // Guarda el ID del doctor seleccionado en el estado local
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

    // Actualiza el estado con la nueva información
    setInfoData(updatedInformacionData);

    // Cierra el modal y reinicia el estado de la opinión
    handleCloseModal();
    setOpinionText({});

    const ubicacion = informacion.direccion;
    const puntaje = opinionText.rating;
    const mensaje = opinionText.opinion;
    const idMedico = selectedId;
    const idPaciente = patientDetail.id;
    postOpinions({ ubicacion, puntaje, mensaje, idMedico, idPaciente })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  console.log("informacionData", informacionData);
  console.log("infoData", infoData);
  console.log("opinionText", opinionText);

  return (
    <>
      <Box>Estos son los doctores consultados</Box>
      {loading ? (
        <div>Cargando</div>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          {!informacion.length ? (
            <>
              <Skeleton>No datos para mostrar</Skeleton>
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
                    value={opinionText.rating} // Asignar el valor de rating desde el estado opinionText
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
                    value={opinionText.opinion} // Asignar el valor de opinion desde el estado opinionText
                    onChange={(e) =>
                      setOpinionText((prevOpinionText) => ({
                        ...prevOpinionText,
                        opinion: e.target.value,
                      }))
                    }
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleAddOpinion}
                  >
                    Agregar Opinión
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
