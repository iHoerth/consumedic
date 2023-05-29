import React, { useState } from "react";
import { Typography, Box, Rating, Pagination } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

const OpinionsDoctor = ({ opinions, opinionsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();

  const indexOfLastOpinion = currentPage * opinionsPerPage;
  const indexOfFirstOpinion = indexOfLastOpinion - opinionsPerPage;
  const currentOpinions = opinions.slice(
    indexOfFirstOpinion,
    indexOfLastOpinion
  );

  const totalPages = Math.ceil(opinions.length / opinionsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentOpinions.map((opinion) => (
        <Box
          key={opinion.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid",
            borderRadius: "5px",
            padding: "10px",
            margin: "20px",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            {`${opinion.PacienteType?.nombre} ${opinion.PacienteType?.apellido}`}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {opinion.fecha}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {opinion.mensaje}
          </Typography>
          <Rating
            value={opinion.puntaje}
            readOnly
            sx={{ color: theme.palette.primary.main }}
          />
        </Box>
      ))}
      {opinions.length > opinionsPerPage && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            pb: "10px",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default OpinionsDoctor;
