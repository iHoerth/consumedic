import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Box, useMediaQuery, Rating, Divider } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PaidIcon from '@mui/icons-material/Paid';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';

import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import { blue, green, lightGreen } from "@mui/material/colors";

import { TableCell, TableBody, TableRow, Table, TableHead } from '@mui/material'

const Profile = ({ doctorDetail }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('tablet'));

  const { id, nombre, apellido, direccion, Especialidads, imagen, Descripcion, CardMedia, precio, Opinions } = doctorDetail;
  // console.log(doctorDetail);
  const especialidades = [];
  Especialidads?.map(espe => especialidades.push(espe.name))
  especialidades.join(", ")
  const { pacientes, turnos, fetchPacientes, fetchTurnos } = useContext(Context)[3];
  const { doctorOpinions, fetchOpinions } = useContext(Context)[0];

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = doctorOpinions.length;


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  useEffect(() => {
    if (doctorOpinions.length === 0) {
      const search = async () => {
        await fetchOpinions(id);
      }
      search()
    }
    fetchPacientes(id);
    fetchTurnos(id);
    fetchOpinions(id);
  }, [])
  // console.log(doctorOpinions);
  // console.log(maxSteps);




  let cantTurnos = 0;
  if (turnos.viejosTurnos) {
    cantTurnos += turnos.viejosTurnos.length
  }
  if (turnos.futurosTurnos) {
    cantTurnos += turnos.futurosTurnos.length
  }
  const ingresos = (cantTurnos * precio).toLocaleString()

  let puntajesOpinions = [];
  if (Opinions?.length > 0) {
    Opinions.map(opinion => puntajesOpinions.push(opinion.puntaje))
  }
  let suma = 0;
  let promedioOpiniones = 0
  for (let i = 0; i < puntajesOpinions.length; i++) {
    suma = suma + puntajesOpinions[i]
  }
  if (Opinions?.length) {
    promedioOpiniones = (suma / Opinions.length).toFixed(2)
  }

  return (
    <>
      <Box>
        <Box sx={{
          backgroundColor: theme.palette.secondary.main,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: 'center',
          pt: "10px",
          pb: "20px",
          borderRadius: "10px 10px 0px 0px"
        }}>
          <Box sx={{ flexDirection: "column", ml: "15px" }}>
            <Avatar alt={`${nombre} ${apellido}`} src={imagen}
              sx={{
                width: isMobile ? '20vw' : '15vw',
                minWidth: "100px",
                minHeight: "100px",
                height: isMobile ? '20vw' : '15vw',
              }} />
          </Box>
          <Box sx={{ flexDirection: "column", mr: "15px", textAlign: "right", alignItems: "start" }}>
            <Typography variant={isMobile ? "h6" : "h4"} sx={{ textAlign: "right", color: "white" }}>{nombre} {apellido}</Typography>
            <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{ textAlign: "right", color: "white" }}>{especialidades}</Typography>
            <Typography variant={isMobile ? "body4" : "subtitle2"} sx={{ textAlign: "right", color: "white" }}>{Descripcion}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              mt: "10px",
              p: "0 10px 0 5px",
              display: 'flex',
              flexDirection: 'column',
              alignItems: "center",
              width: "170px",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              backgroundColor: "#8f8f8f",
            }}
          >
            <Box sx={{ display: "flex", mt: "5px", alignItems: "center", width: "150px", justifyContent: "space-evenly" }}>
              <Box>
                <PersonIcon fontSize="large" />
              </Box>
              <Box sx={{ flexDirection: "column", ml: "10px", mt: "7px", mb: "10px", textAlign: "center" }}>
                <Typography component="div" variant="subtitle1">
                  Pacientes
                </Typography>
                <Typography variant="subtitle1">{pacientes.length}</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              p: "0 10px 0 5px",
              display: 'flex',
              flexDirection: 'column',
              alignItems: "center",
              width: "170px",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              backgroundColor: "#8f8f8f",
              maxWidth: "200px"
            }}
          >
            <Box sx={{ display: "flex", mt: "5px", alignItems: "center", width: "150px", justifyContent: "space-evenly" }}>
              <Box>
                <DateRangeIcon fontSize="large" />
              </Box>
              <Box sx={{ flexDirection: "column", ml: "10px", mt: "7px", mb: "10px", textAlign: "center" }}>
                <Typography component="div" variant="subtitle1">
                  Turnos
                </Typography>
                <Typography variant="subtitle1">{cantTurnos}</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              p: "0 10px 0 5px",
              display: 'flex',
              flexDirection: 'column',
              alignItems: "center",
              width: "170px",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              backgroundColor: "#8f8f8f",
              maxWidth: "200px"
            }}
          >
            <Box sx={{ display: "flex", mt: "5px", alignItems: "center", width: "150px", justifyContent: "space-evenly" }}>
              <Box>
                <PaidIcon fontSize="large" />
              </Box>
              <Box sx={{ flexDirection: "column", ml: "10px", mt: "7px", mb: "10px", textAlign: "center" }}>
                <Typography component="div" variant="subtitle1">
                  Ingresos
                </Typography>
                <Typography variant="subtitle1">{`$ ${ingresos}`}</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              p: "0 10px 0 5px",
              display: 'flex',
              flexDirection: 'column',
              alignItems: "center",
              width: "170px",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              backgroundColor: "#8f8f8f",
              maxWidth: "200px"
            }}
          >
            <Box sx={{ display: "flex", mt: "5px", alignItems: "center", width: "150px", justifyContent: "space-evenly" }}>
              <Box>
                <CommentIcon fontSize="large" />
              </Box>
              <Box sx={{ flexDirection: "column", ml: "10px", mt: "7px", mb: "10px", textAlign: "center" }}>
                <Typography component="div" variant="subtitle1">
                  Opiniones
                </Typography>
                <Typography variant="subtitle1">{Opinions?.length}</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              p: "0 10px 0 5px",
              display: 'flex',
              flexDirection: 'column',
              alignItems: "center",
              width: "170px",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              backgroundColor: "#8f8f8f",
              maxWidth: "200px"
            }}
          >
            <Box sx={{ display: "flex", mt: "5px", alignItems: "center", width: "150px", justifyContent: "space-evenly" }}>
              <Box>
                <StarIcon fontSize="large" />
              </Box>
              <Box sx={{ flexDirection: "column", ml: "10px", mt: "7px", mb: "10px", textAlign: "center" }}>
                <Typography component="div" variant="subtitle1">
                  Rating
                </Typography>
                <Typography variant="subtitle1">{promedioOpiniones}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", alignItems:"start" }}>
          <Box sx={{width:'60%'}}>
            <CardContent style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop:'5px' }}>
            <Typography variant="h6" sx={{ margin:'5px', color: "#4b4b4b" }}>Siguientes turnos</Typography>
              <Table >
                <TableHead style={{ backgroundColor: "lightgray", position: "sticky", top: 0, zIndex: 1 }}>
                  <TableRow>
                    <TableCell key="nombre" align="left">Fecha</TableCell>
                    <TableCell key="apellido" align="center">Hora</TableCell>
                    <TableCell align="center">Paciente</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {turnos.futurosTurnos?.slice(0,3).map((turno) => (
                    <TableRow key={turno.id}>
                      <TableCell align="center">{turno.fecha}</TableCell>
                      <TableCell align="center">{turno.hora}</TableCell>
                      <TableCell align="center">{turno.paciente.apellido}</TableCell>
                    </TableRow>
                  ))}
                  {!turnos.futurosTurnos?.length && (
                    <TableRow>
                      <TableCell colSpan={3} align="center">No hay turnos para mostrar</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Box>
          {doctorOpinions.length === 0 ? null :
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "top" }}>
              <Box
                sx={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  width: "500px", justifyContent: "center",
                  mt: "30px", borderRadius: "10px", textAlign: "center"
                }}
              >
                <Box sx={{ border: "1px solid", p: "5px", borderRadius: "5px", width: "80%", justifyContent: "center", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ textAlign: "center", color: "#4b4b4b" }}>Opiniones de Pacientes</Typography>
                  <Box sx={{ bgcolor: theme.palette.secondary.light, borderRadius: "5px" }}>
                    <Typography variant="h6" sx={{ color: "white", }}>{doctorOpinions[activeStep].PacienteType.nombre} {doctorOpinions[activeStep].PacienteType.apellido}</Typography>
                  </Box>
                  <Box component="fieldset" mb={1} borderColor="transparent">
                    <Rating name="stars" sx={{ color: theme.palette.secondary.main }}
                      value={doctorOpinions[activeStep].puntaje}
                      readOnly
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      pb: "30px",
                    }}
                  >
                    {doctorOpinions[activeStep].mensaje}
                  </Box>
                  <Divider />
                  <Box sx={{ backgroundColor: "#8f8f8f" }}>
                    <MobileStepper
                      variant="text"
                      steps={maxSteps}
                      position="static"
                      activeStep={activeStep}
                      nextButton={
                        <Button
                          size="small"
                          onClick={handleNext}
                          disabled={activeStep === maxSteps - 1}
                        >
                          Next
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )}
                        </Button>
                      }
                      backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )}
                          Back
                        </Button>
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          }
        </Box>
      </Box>

    </>
  )
}
export default Profile;