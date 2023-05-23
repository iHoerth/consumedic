import React, { useState } from "react";
import { Button, Input, Box } from "@mui/material";

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);

  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments([...documents, file]);
      event.target.value = null;
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ pb: "30px" }}>
        En este sector podras almacenar todos tus documentos
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Input type="file" onChange={handleDocumentUpload} />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "30px", mb: "10px" }}
        >
          Agregar documento
        </Button>
      </Box>
      {documents.map((document, index) => (
        <Box key={index}>{document.name}</Box>
      ))}
    </Box>
  );
};

export default MyDocuments;
