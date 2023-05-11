import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
const itemData = [
  {
    img: "https://calim.com.ar/wp-content/uploads/2021/08/como-facturo-clinica-me%CC%81dico.jpeg",
    title: "Medico Clinico",
  },
  {
    img: "https://cjp.pe/wp-content/uploads/2021/02/cardiologia.jpg",
    title: "Cardiologo",
  },
  {
    img: "https://www.definicionabc.com/wp-content/uploads/2014/07/Ginecologia.jpg",
    title: "Ginecologo",
  },
  {
    img: "https://www.iglobalmed.com/productos/images/386A_web8342.jpg",
    title: "Traumatologo",
  },
];
const ImageHome = () => {
  return (
    <div>
      <ImageList
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "84px",
          justifyContent: "center",
          width: "100%",
          mb: "60px",
        }}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            sx={{
              width: "30%",
              m: "20px",
            }}
          >
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar title={item.title} sx={{ fontSize: "20px" }} />
          </ImageListItem>
        ))}
      </ImageList>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "35px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            bgcolor: "#b3e5fc",
            p: "10px",
          }}
        >
          Encuentra profesionales online y agenda turnos al instante
        </Typography>
      </Box>
    </div>
  );
};

export default ImageHome;
