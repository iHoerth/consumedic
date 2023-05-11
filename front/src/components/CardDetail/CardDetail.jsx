import React from "react";
import CardMUI from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SmsIcon from "@mui/icons-material/Sms";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideocamIcon from "@mui/icons-material/Videocam";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { NavLink } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardDetail = ({doctorData}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const doctor = {
    name: "Dr. Juan Pérez",
    profileImage:
      "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/5KCVGAGSP5HFJA7KMALNP7ITS4.jpg",
    specialty: "Cardiología",
    info: "Médico especialista en cardiología con más de 10 años de experiencia",
    opinions: ["Excelente médico", "Muy atento con los pacientes"],
    location: "Ciudad de México",
    price: 1500,
    agenda: ["Lunes - Viernes 9:00am - 1:00pm", "Sábados 9:00am - 12:00pm"],
    stars: 2,
    contacto: "345677",
    experiencia: [
      {
        lugar: "Hospital ABC",
        posicion: "Médico Residente",
        duracion: "2010 - 2013",
      },
      {
        lugar: "Hospital XYZ",
        posicion: "Médico Cardiólogo",
        duracion: "2013 - Presente",
      },
    ],
    servicios: ["Consultas de cardiología", "Estudios de electrocardiograma"],
    formacion:
      "Especialidad en cardiología en la Universidad Nacional Autónoma de México",
    idioma: ["Español", "Inglés"],
    atiendeA: "Adultos, mayores de 18 años",
    medioDePago: "Mercado Pago",
    consultorio: [
      "Calle Falsa 123, Ciudad de México",
      "Calle Falsa 345, Ciudad de México",
    ],
    linkedin: "https://www.linkedin.com",
  };
  return (
    <div>
      <CardMUI
        sx={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ p: 2 }}>
          <Avatar
            alt="img"
            src={doctor.profileImage}
            sx={{
              width: 200,
              height: 200,
            }}
          />
        </IconButton>

        <CardHeader
          action={
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          }
          title={doctor.name}
          subheader={doctor.specialty}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ pb: 1, width: "50%" }}
        >
          {doctor.info}
        </Typography>
        <CardContent>
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={doctor.stars}
              precision={0.5}
              readOnly
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
            {doctor.opinions}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              color="primary"
              variant="outlined"
              size="md"
              sx={{ mt: 2, mb: 2 }}
            >
              <CalendarMonthIcon />
              <Typography variant="body2" color="primary" sx={{ pl: 1 }}>
                Pedir turno
              </Typography>
            </Button>
            <Button color="primary" variant="outlined" size="md">
              <SmsIcon />
              <Typography variant="body2" color="primary" sx={{ pl: 1 }}>
                Enviar mensaje
              </Typography>
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <LocationOnSharpIcon sx={{ marginRight: "0.5rem" }} />
            {doctor.location}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <VideocamIcon sx={{ marginRight: "0.5rem" }} />
            Consulta en linea: ${doctor.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <LocalPhoneIcon sx={{ marginRight: "0.5rem" }} />
            {doctor.contacto}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <PeopleAltIcon sx={{ marginRight: "0.5rem" }} />
            Atiende a: {doctor.atiendeA}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <PaymentsIcon sx={{ marginRight: "0.5rem" }} />
            Pagos: {doctor.medioDePago}
          </Typography>
          <NavLink
            to={doctor.linkedin}
            target="_blank"
            activeClassName="active"
          >
            <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
              <LinkedInIcon sx={{ marginRight: "0.5rem" }} />
              LinkedIn
            </Typography>
          </NavLink>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: "33%", flexShrink: 0 }}
              >
                Experiencia
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {doctor.experiencia &&
                  doctor.experiencia.map((item, index) => (
                    <div key={index}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ pb: 1 }}
                      >
                        {item.lugar}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ pb: 1 }}
                      >
                        {item.duracion}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ pb: 1 }}
                      >
                        {item.posicion}
                      </Typography>
                    </div>
                  ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: "33%", flexShrink: 0 }}
              >
                Formacion
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {doctor.formacion}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: "33%", flexShrink: 0 }}
              >
                Idioma
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {doctor.idioma &&
                  doctor.idioma.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: "33%", flexShrink: 0 }}
              >
                Servicios
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {doctor.servicios &&
                  doctor.servicios.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: "33%", flexShrink: 0 }}
              >
                Consultorios
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {doctor.consultorio &&
                  doctor.consultorio.map((item, index) => (
                    <div key={index}>Direccion: {item}</div>
                  ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </CardMUI>
    </div>
  );
};

export default CardDetail;
