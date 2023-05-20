import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@mui/material";

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
  ];
  const informacionData = informacion.map((item) => ({
    id: item.id,
    apellido: item.apellido,
    nombre: item.nombre,
    telefono: item.telefono,
    email: item.email,
  }));

  return (
    <>
      {loading ? (
        <div>CARGANDO</div>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            disableSelectionOnClick
            rows={informacionData}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </Box>
      )}
    </>
  );
};

export default MyDoctors;
