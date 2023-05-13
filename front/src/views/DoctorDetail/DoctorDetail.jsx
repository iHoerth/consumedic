import { useContext, useEffect, useState } from "react";
import style from "./DoctorDetail.module.css";
import { Context } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
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

const DoctorDetail = () => {
  const [loading, setLoading] = useState(true);

  const [doctorsData] = useContext(Context);
  const { doctorDetail, fetchDoctorById, cleanDetail } = doctorsData;
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    if (!Object.keys(doctorDetail).length) {
      fetchDoctorById(id).then(() => {
        setLoading(false);
      });
    } else {
      console.log(doctorDetail);
      setLoading(false);

      return () => {
        cleanDetail();
        console.log(" ***** UNMOUNT + CLEANDETAIL *****");
      };
    }
  }, [id, doctorDetail]);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return <div>CARGANDO</div>;
  }

  return (
    <div className={style.divBody}>
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
              <FavoriteIcon />
            </IconButton>
          }
          title={doctorDetail.nombre + " " + doctorDetail.apellido}
          subheader={
            doctorDetail.Especialidads &&
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
            <Rating
              name="half-rating-read"
              defaultValue={
                doctorDetail.Opinions.length &&
                doctorDetail.Opinions.reduce((acc, opinion, index) => {
                  return (acc + opinion.puntaje) / (index + 1);
                }, 0)
              }
              precision={0.5}
              readOnly
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
            {doctorDetail.Opinions.length &&
              doctorDetail.Opinions.map((item, index) => (
                <span key={index}>{item.mensaje}</span>
              ))}
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
            {doctorDetail.direccion}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <VideocamIcon sx={{ marginRight: "0.5rem" }} />
            Consulta en linea: ${doctorDetail.precio}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <LocalPhoneIcon sx={{ marginRight: "0.5rem" }} />
            {doctorDetail.telefono}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <PeopleAltIcon sx={{ marginRight: "0.5rem" }} />

            {doctorDetail.ObraSocials &&
              doctorDetail.ObraSocials.map((item, index) => (
                <span key={index}>Obra sociales: {item.nombre}</span>
              ))}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            <PaymentsIcon sx={{ marginRight: "0.5rem" }} />
            Pagos: Mercado Pago
          </Typography>
          <NavLink to={doctorDetail.linkedin} target="_blank">
            <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
              <LinkedInIcon sx={{ marginRight: "0.5rem" }} />
              LinkedIn
            </Typography>
          </NavLink>

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
                {doctorDetail.titulo}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </CardMUI>
    </div>
  );
};

export default DoctorDetail;
