import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideocamIcon from "@mui/icons-material/Videocam";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import {
  useMediaQuery,
  useTheme,
  Card,
  Divider,
  Snackbar,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Container, Box } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Modal } from "@mui/material";
import { Star } from "@mui/icons-material";
import MailMensajeDoctor from "../../components/Mail/MailMensajeDoctor";

import Calendar from "../../components/Calendar/Calendar";

import OpinionsDoctor from "./OpinionsDoctor";

import detail23 from "../../assets/Img/detail23.jpg";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#0fb1bc",
  },
});

const DoctorDetail = () => {
  const theme = useTheme();
  const {
    modal,
    setModal,
    snackOk,
    setSnackOk,
    snackOkMensaje,
    setSnackOkMensaje,
    snackFail,
    setSnackFail,
    snackFailMensaje,
    setSnackFailMensaje,
  } = useContext(Context)[7];
  const [loading, setLoading] = useState(true);
  const [doctorsData] = useContext(Context);
  const { doctorDetail, fetchDoctorById } = doctorsData;
  const { doctorOpinions, fetchOpinions } = useContext(Context)[0];
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const { values } = theme.breakpoints;

  useEffect(() => {
    setLoading(true);
    fetchDoctorById(id).then(() => {
      setLoading(false);
    });
    setLoading(false);
  }, [id]);

  useEffect(() => {
    setLoading(true);

    fetchOpinions(id).then(() => {
      setLoading(false);
    });
  }, [id]);
  console.log("doctorOpinions", doctorOpinions);

  const [expanded, setExpanded] = useState(false);

  const opinionsPerPage = 3;

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
    return <div>Cargando</div>;
  }

  return (
    <>
      <Container
        sx={{
          backgroundImage: `url('${detail23}')`,
          backgroundPosition: "bottom",
          backgroundPositionY: "23%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          position: "relative",
          width: {
            mobile: 'column',
            tablet: 'column',
            laptop: 'column',
            desktop: '99.5%',
          },
          height: "100%",
          display: "flex",
          margin: 'auto',
          alignContent: 'center',
          justifyContent: 'center',
          flexDirection: {
            mobile: 'column',
            tablet: 'column',
            laptop: 'column',
            desktop: 'column',
          },
          alignItems: "center",
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
        <Snackbar
          open={snackOk}
          autoHideDuration={1500}
          onClose={() => {
            setSnackOk(false);
            setSnackOkMensaje("");
          }}
        >
          <Alert severity="success" variant="filled">
            <AlertTitle>Mensaje Exitoso</AlertTitle>
            {snackOkMensaje}
          </Alert>
        </Snackbar>
        <Snackbar
          open={snackFail}
          autoHideDuration={1500}
          onClose={() => {
            setSnackFail(false);
            setSnackFailMensaje("");
          }}
        >
          <Alert severity="error" variant="filled">
            <AlertTitle>Mensaje de Error</AlertTitle>
            {snackFailMensaje}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            typography: theme.typography,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: "150px",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginRight: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: "5px",
                backgroundColor: "white",
                padding: "20px", width: {
                  mobile: '99.5%',
                  tablet: '99.5%',
                  laptop: '99.5%',
                  desktop: values.desktop,
                },
              }}
            >
              <IconButton sx={{ p: 2 }}>
                <Avatar
                  alt="img"
                  src={doctorDetail.imagen}
                  sx={{
                    width: {
                      mobile: 80,
                      tablet: 150,
                      laptop: 200,
                      desktop: 200,
                    },
                    height: {
                      mobile: 80,
                      tablet: 150,
                      laptop: 200,
                      desktop: 200,
                    }
                  }}
                />
              </IconButton>

              <Box
                sx={{
                 
                  // height: {
                  //   mobile: '90%',
                  //   tablet: '60%',
                  //   laptop: '60%',
                  //   desktop: '50%',
                  // },
                  // margin: {
                  //   mobile: 'auto',
                  //   tablet: 'auto 2px',
                  //   laptop: 'auto ',
                  //   desktop: 'auto 5px',
                  // }
                }}
              >
                <CardHeader
                  title={doctorDetail.nombre + " " + doctorDetail.apellido}
                  subheader={
                    doctorDetail.Especialidads?.length &&
                    doctorDetail.Especialidads.map((item, index) => (
                      <span key={index}>{`${item.name} `}</span>
                    ))
                  }
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ pb: 1, width: "60%" }}
                >
                  {doctorDetail.Descripcion}
                </Typography>
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{ paddingBottom: "20px", paddingTop: "10px" }}
                  spacing={1}
                >
                  <Rating
                    name="stars"
                    value={5}
                    max={5}
                    readOnly
                    icon={<Star style={{ color: theme.palette.primary.main }} />}
                    emptyIcon={<Star />}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {doctorDetail.Opinions?.length &&
                      doctorDetail.Opinions?.length}{" "}
                    Opiniones
                  </Typography>

                  <Button
                    color="primary"
                    variant="outlined"
                    size="md"
                    //onClick={() => setModal(true)}   //open={modal}
                    onClick={handleOpen}
                  >
                    <SmsIcon color="primary" />
                    <Typography variant="body2" color="primary" sx={{ pl: 1 }}>
                      Enviar mensaje
                    </Typography>
                  </Button>
                </Stack>
                <Modal onClose={handleClose} open={open}>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "60%",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      outline: "none",
                    }}
                  >
                    <MailMensajeDoctor emailMedico={doctorDetail.email} />
                  </Box>
                </Modal>
              </Box>
            </Box>

            <Container
              sx={{
                display: 'flex',
                flexDirection: {
                  mobile: 'column',
                  tablet: 'column',
                  laptop: 'row',
                  desktop: values.desktop,
                },
                justifyContent: 'space-between'
              }}>
              <Box sx={{ minWidth: 275, margin: 'auto' }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      backgroundColor: theme.palette.primary.main,
                      padding: "4px",
                      borderRadius: "5px",
                    }}
                    component="div"
                    color="white"
                  >
                    Pedir Turno
                  </Typography>
                  <Calendar id={id} calendar={doctorDetail.calendar} />
                </CardContent>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-beetwen',
                alignItems:'center',
                width: {
                  mobile: '99.5%',
                  tablet: '99.5%',
                  laptop: '50%',
                  desktop: '45%',
                },
                flexDirection: {
                  mobile: 'column',
                  tablet: 'column',
                  laptop: 'row',
                  desktop: values.desktop,
                },
              }}>
                <Card sx={{
                  width: {
                    mobile: '50%',
                    tablet: '45%',
                    laptop: '40%',
                    desktop: '80%',
                  },
                  height: {
                    mobile: '90%',
                    tablet: '60%',
                    laptop: '60%',
                    desktop: '50%',
                  },
                  margin: {
                    mobile: 'auto 12px',
                    tablet: 'auto 12px',
                    laptop: 'auto ',
                    desktop: 'auto 5px',
                  }
                }}>
                  <CardContent>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        backgroundColor: theme.palette.primary.main,
                        padding: "4px",
                        borderRadius: "4px",
                      }}
                      component="div"
                      color="white"
                    >
                      Contactos
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ p: 1 }}
                    >
                      <LocationOnSharpIcon
                        sx={{ marginRight: "0.5rem" }}
                        color="primary"
                      />
                      {doctorDetail.direccion}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ p: 1 }}
                    >
                      <LocalPhoneIcon
                        sx={{ marginRight: "0.5rem" }}
                        color="primary"
                      />
                      {doctorDetail.telefono}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ p: 1 }}
                    >
                      <EmailIcon
                        sx={{ marginRight: "0.5rem" }}
                        color="primary"
                      />
                      {doctorDetail.email}
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{
                  width: {
                    mobile: '50%',
                    tablet: '45%',
                    laptop: '40%',
                    desktop: '80%',
                  },
                  height: {
                    mobile: '90%',
                    tablet: '60%',
                    laptop: '60%',
                    desktop: '50%',
                  },
                  margin: {
                    mobile: 'auto',
                    tablet: 'auto 2px',
                    laptop: 'auto ',
                    desktop: 'auto 5px',
                  }
                }}>
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "600",
                        backgroundColor: theme.palette.primary.main,
                        padding: "4px",
                        borderRadius: "4px",
                      }}
                      component="div"
                      color="white"
                    >
                      Sobre la consulta
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ p: 1 }}
                    >
                      <VideocamIcon
                        sx={{ marginRight: "0.5rem" }}
                        color="primary"
                      />
                      Consulta en linea: ${doctorDetail.precio}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ p: 1 }}
                    >
                      <PeopleAltIcon
                        sx={{ marginRight: "0.5rem" }}
                        color="primary"
                      />
                      {doctorDetail.ObraSocials?.length &&
                        doctorDetail.ObraSocials.map((item, index) => (
                          <span key={index}>Obra sociales: {item.nombre}</span>
                        ))}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ p: 1 }}
                    >
                      <PaymentsIcon
                        sx={{ marginRight: "0.5rem" }}
                        color="primary"
                      />
                      Pagos: Mercado Pago
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Container>




            {/* <CardContent >
              <Box
                sx={{
                  display: "flex",
                  // flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  pb: "20px",
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignContent: 'center'
                  }}
                >


                  
                </Box>

                
                <Divider orientation="horizontal" flexItem />
              </Box>
            </CardContent> */}
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{ borderRadius: "5px" }}
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
                  En {doctorDetail.titulo}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Box
              sx={{ mt: "10px", backgroundColor: "white", borderRadius: "5px" }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "600",
                  backgroundColor: theme.palette.primary.main,
                  padding: "4px",
                  borderRadius: "4px",
                }}
                component="div"
                color="white"
              >
                Opiniones de pacientes
              </Typography>
              <OpinionsDoctor
                opinions={doctorOpinions}
                opinionsPerPage={opinionsPerPage}
              />
            </Box>
          </Box>


        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default DoctorDetail;
