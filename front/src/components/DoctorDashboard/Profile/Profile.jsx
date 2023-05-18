import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Box, Divider, AvatarGroup } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Opinions from "../../Opinions/Opinions";

const Profile = () => {
  const opinions = [
    {
      name: "John Doe",
      text: "Excelente servicio. Muy recomendado.",
      stars: 5,
    },
    {
      name: "Jane Smith",
      text: "Buen trato y atención al paciente.",
      stars: 4,
    },
    {
      name: "Michael Johnson",
      text: "No quedé satisfecho con la atención recibida.",
      stars: 2,
    },
  ];
  return (
    <>
      <Card sx={{ width: "70%" }}>
        <CardActionArea>
          <CardContent
            sx={{
              backgroundImage: `url("data:image/jpeg;base64,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")`,
              my: 3,
              mx: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/5KCVGAGSP5HFJA7KMALNP7ITS4.jpg"
              sx={{
                width: 200,
                height: 200,
              }}
            />
            <Box
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "white",
                width: "50%",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div">
                  Hola Dr. Juan Perez
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Aqui puede ver todos sus datos.
                </Typography>
              </Grid>
            </Box>
          </CardContent>

          <CardContent container>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                pb: "20px",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                Juan Perez
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pb: "1px",
                }}
              >
                Medico Gastroenterologo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Buenos aires
              </Typography>
            </Grid>
            <Grid container>
              <Typography variant="body2" color="text.secondary">
                Total pascientes
                <AvatarGroup total={24}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
                  />
                  <Avatar
                    alt="Travis Howard"
                    src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
                  />
                  <Avatar
                    alt="Agnes Walker"
                    src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
                  />
                </AvatarGroup>
              </Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      <Opinions opinions={opinions} />
    </>
  );
};
export default Profile;
