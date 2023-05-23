/*import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Skeleton } from "@mui/material";

const MyDoctors = () => {
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

  console.log("informacion", informacion);

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
      headerName: "Opinión",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          value={params.row.opinion}
          //onChange={(e) => handleOpinionChange(params.row.id, e.target.value)}
        />
      ),
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      width: 120,
      editable: false,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row.id)}>Eliminar</button>
      ),
    },
  ];

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
    };
  });

  return (
    <>
      {loading ? (
        <div>CARGANDO</div>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          {!informacion.length ? (
            <>
              <Skeleton>NO HAY INFO CRACK</Skeleton>
            </>
          ) : (
            <DataGrid
              disableSelectionOnClick
              rows={informacionData}
              columns={columns}
              pageSize={5}
              checkboxSelection
              // id={patientDetail.id && patientDetail.id}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default MyDoctors;*/

import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Skeleton, Modal, Button, TextField } from "@mui/material";
import { Icon } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

const MyDoctors = () => {
  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [opinionText, setOpinionText] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchPatientData(patientDetail.id).then(() => {
      setLoading(false);
    });

    if (!!informacion.length) {
      setLoading(false);
    }
  }, [patientDetail.id]);

  console.log("informacion", informacion);

  const columns = [
    //{ field: "id", headerName: "ID", width: 90 },
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
          <EditIcon variant="contained" onClick={handleOpenModal} />
        </Icon>
      ),
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row.id)}>Eliminar</button>
      ),
    },
  ];

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

  const handleDelete = (id) => {
    // Implementa la lógica para eliminar el elemento con el ID proporcionado
  };

  const handleOpinionChange = (id, value) => {
    // Implementa la lógica para actualizar la opinión del elemento con el ID proporcionado
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddOpinion = () => {
    // Agrega la opinión al elemento correspondiente en el estado local o envíala a la API
    /* const updatedInformacionData = informacionData.map((item) => {
      if (item.id === selectedId) {
        return { ...item, opinion: opinionText };
      }
      return item;
    });

    // Actualiza el estado con la nueva información
    setInformacionData(updatedInformacionData);

    // Cierra el modal y reinicia el estado de la opinión
    handleCloseModal();
    setOpinionText("");*/
  };

  return (
    <>
      <Box>Estos son los doctores consultados</Box>
      {loading ? (
        <div>Cargando</div>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          {!informacion.length ? (
            <>
              <Skeleton>No datos para mostar</Skeleton>
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
                  <TextField
                    label="Opinión"
                    multiline
                    rows={4}
                    value={opinionText}
                    onChange={(e) => setOpinionText(e.target.value)}
                    fullWidth
                  />

                  <Button variant="contained" onClick={handleAddOpinion}>
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
