import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
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
import { useMediaQuery, useTheme } from "@mui/material";
import { Container, Box } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Modal } from "@mui/material";
import Mail from "../../components/Mail/Mail";

import Calendar from "../../components/Calendar/Calendar";

import detail23 from "../../assets/Img/detail23.jpg";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#0fb1bc',
  },
});

const DoctorDetail = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [doctorsData] = useContext(Context);
  const { doctorDetail, fetchDoctorById, cleanDetail } = doctorsData;
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchDoctorById(id).then(() => {
      setLoading(false);
    });
    setLoading(false);
  }, [id]);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <div>CARGANDO</div>;
  }

  console.log(doctorDetail);

  return (
    <Container
      sx={{
        backgroundImage: `url('${detail23}')`,
        backgroundPosition: "bottom",
        backgroundPositionY: "23%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // typography: theme.typography,
        "@media (max-width: 600px)": {
          height: {
            xs: "50vh",
            sm: "60vh",
            md: "70vh",
            lg: "80vh",
          },
        },
      }}
    >
      <NavBar />

      <CardMUI
        sx={{
          maxWidth: 500,
          typography: theme.typography,
          width: "100%",
          mt: "10px",
          mb: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "15%",
          marginBottom: "10%",
        }}
      >
        <IconButton sx={{ p: 2 }}>
          <Avatar
            alt="img"
            src={doctorDetail.imagen}
            sx={{
              width: 200,
              height: 200,
            }}
          />
        </IconButton>

        <CardHeader
          action={
            <IconButton>
              <FavoriteIcon color="primary" />
            </IconButton>
          }
          title={doctorDetail.nombre + " " + doctorDetail.apellido}
          subheader={
            doctorDetail.Especialidads?.length &&
            doctorDetail.Especialidads.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))
          }
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ pb: 1, width: "50%" }}
        >
          {doctorDetail.Descripcion}
        </Typography>
        <CardContent>
          <Stack spacing={1}>
            <StyledRating
              name="half-rating-read"
              defaultValue={
                doctorDetail.Opinions?.length &&
                doctorDetail.Opinions.reduce((acc, opinion, index) => {
                  return (acc + opinion.puntaje) / (index + 1);
                }, 0)
              }
              precision={0.5}
              readOnly
              color="primary"
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
            {doctorDetail.Opinions?.length ? (
              doctorDetail.Opinions.map((item, index) => (
                <span key={index}>{item.mensaje}</span>
              ))
            ) : (
              <span>No hay opiniones disponibles</span>
            )}
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
            <Button
              color="primary"
              variant="outlined"
              size="md"
              onClick={handleOpen}
            >
              <SmsIcon color="primary" />
              <Typography variant="body2" color="primary" sx={{ pl: 1 }}>
                Enviar mensaje
              </Typography>
            </Button>

            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  width: "30%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  outline: "none",
                }}
              >
                <Mail />
              </Box>
            </Modal>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <LocationOnSharpIcon
              sx={{ marginRight: "0.5rem" }}
              color="primary"
            />
            {doctorDetail.direccion}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <VideocamIcon sx={{ marginRight: "0.5rem" }} color="primary" />
            Consulta en linea: ${doctorDetail.precio}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <LocalPhoneIcon sx={{ marginRight: "0.5rem" }} color="primary" />
            {doctorDetail.telefono}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <PeopleAltIcon sx={{ marginRight: "0.5rem" }} color="primary" />
            {doctorDetail.ObraSocials?.length &&
              doctorDetail.ObraSocials.map((item, index) => (
                <span key={index}>Obra sociales: {item.nombre}</span>
              ))}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <PaymentsIcon sx={{ marginRight: "0.5rem" }} color="primary" />
            Pagos: Mercado Pago
          </Typography>
          <NavLink to="https://www.linkedin.com" target="_blank">
            <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
              <LinkedInIcon sx={{ marginRight: "0.5rem" }} color="primary" />
              LinkedIn
            </Typography>
          </NavLink>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
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
                {doctorDetail.titulo}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </CardMUI>
      <Calendar id={id} calendar={doctorDetail.calendar} />
      <Footer />
    </Container>
  );
};

export default DoctorDetail;
