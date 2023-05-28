import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { Box, Skeleton, Typography } from "@mui/material";

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

  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
      disableColumnMenu: true,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const fecha1 = new Date(v1);
        const fecha2 = new Date(v2);

        if (fecha1 < fecha2) {
          return -1;
        } else if (fecha1 > fecha2) {
          return 1;
        } else {
          return 0;
        }
      },
    },
    {
      field: "hora",
      headerName: "Hora",
      width: 150,
      disableColumnMenu: true,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const hora1 = new Date(`1970-01-01T${v1}`);
        const hora2 = new Date(`1970-01-01T${v2}`);

        if (hora1 < hora2) {
          return -1;
        } else if (hora1 > hora2) {
          return 1;
        } else {
          return 0;
        }
      },
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "especialidad",
      headerName: "Especialidad",
      width: 150,
      disableColumnMenu: true,
    },

    {
      field: "descripcion",
      headerName: "Descripcion",
      width: 250,
      disableColumnMenu: true,
    },
    {
      field: "respuestaMedico",
      headerName: "Informe medico",
      width: 250,
      disableColumnMenu: true,
    },
  ];

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
      cita.respuestaMedico
        ? cita.respuestaMedico
        : "No hay informe medico médico"
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

  const CustomPagination = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <span style={{ marginRight: "8px" }}>Page:</span>
        <button disabled>1</button>
      </div>
    );
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={informacionData}
        columns={columns}
        components={{
          Pagination: CustomPagination,
        }}
        pagination
      />
    </div>
  );
};

export default MyDates;
