import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import { useTheme, Snackbar, Alert, AlertTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { blue, grey } from '@mui/material/colors';
import { Button } from '@mui/base';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useNavigate } from 'react-router-dom';

const Calendar = ({ id, calendar }) => {
  const navigate = useNavigate();
  const { session, setSession } = useContext(Context)[2];
  const { snackFail, snackFailMensaje, setSnackFail, setSnackFailMensaje } = useContext(Context)[1];

  const theme = useTheme();
  // const { patientDetail } = useContext(Context)[1];
  const meses = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ];
  const cantMostrados = 4;
  let cantHojas;
  let mostrados;

  const [pagina, setPagina] = useState(1);
  const [button, setButton] = useState('Mostrar mas horas');

  if (calendar) {
    mostrados = calendar.slice((pagina - 1) * 4, cantMostrados * pagina);
    cantHojas = Math.ceil(calendar.length / cantMostrados);
  }

  const handleReservation = (id, dia, turno) => {
    if (!session.email) {
      setSnackFail(true);
      setSnackFailMensaje(`Debes iniciar sesion para reservar un turno`)
      navigate(`/login`);
    } else {
      navigate(`/turno/${id}/${id}/${dia.fecha}/${turno.hora}/reserva/0`);
    }
  };

  const handleClick = (event) => {
    if (event.target.name === 'mas') {
      if (pagina < cantHojas) {
        setPagina(pagina + 1);
        mostrados = calendar.slice((pagina - 1) * 4, cantMostrados * pagina);
      }
    } else if (event.target.name === 'menos') {
      if (pagina > 1) {
        setPagina(pagina - 1);
        mostrados = calendar.slice((pagina - 1) * 4, cantMostrados * pagina);
      }
    }
  };

  const handleHeight = () => {
    if (button === 'Mostrar mas horas') {
      setButton('Mostrar menos horas');
    } else if (button === 'Mostrar menos horas') {
      setButton('Mostrar mas horas');
    }
  };

  if (calendar) {
    return (
      <>
        <Snackbar
          open={snackFail}
          autoHideDuration={2500}
          onClose={() => {
            setSnackFail(false);
            setSnackFailMensaje('');
          }}
        >
          <Alert severity="error" variant="filled">
            <AlertTitle>Mensaje de Error</AlertTitle>
            {snackFailMensaje}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            border: 'solid 1px',
            borderColor: '#aeaeae',
            width: '100%',
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              justifyContent: 'center',
              m: 0,
              borderBottom: '1px solid',
              borderRadius: '5px 5px 0 0',
              borderColor: '#aeaeae',
              overflow: 'hidden',
              ...(button === 'Mostrar mas horas' && {
                height: '300px',
              }),
              ...(button === 'Mostrar menos horas' && {
                height: 'fit-content',
                overflowY: 'visible',
              }),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: 'background.paper',
                justifyContent: 'center',
                m: 0,
                height: '560px',
              }}
            >
              <Box
                sx={{
                  mt: '30px',
                  ml: '10px',
                }}
              >
                <Button
                  disabled={pagina === 1}
                  onClick={handleClick}
                  name="menos"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    border: 'none',
                    color: 'white',
                  }}
                >
                  {' '}
                  ᐊ{' '}
                </Button>
              </Box>
              {mostrados.map((dia) => {
                let dd = dia.fecha.split('-')[2];
                let mm = meses[Number(dia.fecha.split('-')[1]) - 1];

                return (
                  <List
                    sx={{
                      width: '85px',
                    }}
                  >
                    <ListItem
                      sx={{
                        justifyContent: 'center',
                      }}
                    >
                      <Typography>{dia.dia}</Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        justifyContent: 'center',
                      }}
                      disablePadding
                    >
                      <Typography>{`${dd} ${mm}`}</Typography>
                    </ListItem>
                    <Divider />
                    {dia.atiende === 'si' ? (
                      dia.turnos.map((turno) => {
                        let hh = turno.hora.split(':')[0];
                        let mm = turno.hora.split(':')[1];
                        return (
                          <ListItem
                            sx={{
                              justifyContent: 'center',
                              p: 0,
                              m: 'auto',
                              width: '60px',
                            }}
                            disablePadding
                          >
                            {turno.estado === 'libre' ? (
                              <ListItemButton
                                sx={{
                                  justifyContent: 'center',
                                  m: 0,
                                  mt: '5px',
                                  mb: '5px',
                                  p: 0,
                                  borderRadius: '5px',
                                  bgcolor: '#a7d5ec ',
                                  color: '#0752df',
                                }}
                                onClick={() => handleReservation(id, dia, turno)}
                              >
                                <Link
                                  style={{
                                    textDecoration: 'none',
                                    color: '#0752df',
                                  }}
                                  // to={`/turno/${id}/${id}/${dia.fecha}/${turno.hora}/reserva/0`}
                                >{`${hh}:${mm}`}</Link>
                                {/* <Typography>{`${hh}:${mm}`}</Typography> */}
                              </ListItemButton>
                            ) : (
                              <ListItemButton
                                disabled
                                sx={{
                                  justifyContent: 'center',
                                  m: 0,
                                  mt: '5px',
                                  mb: '5px',
                                  p: 0,
                                  borderRadius: '5px',
                                  color: '#636364',
                                  textDecoration: 'line-through',
                                }}
                              >
                                <Typography>{`${hh}:${mm}`}</Typography>
                              </ListItemButton>
                            )}
                          </ListItem>
                        );
                      })
                    ) : (
                      <ListItem
                        sx={{
                          justifyContent: 'center',
                        }}
                        disablePadding
                      >
                        <Typography
                          sx={{
                            fontSize: '13px',
                            m: 0,
                            mt: '3px',
                            mb: '3px',
                            p: 0,
                            color: '#848484',
                          }}
                        >
                          No Atiende
                        </Typography>
                      </ListItem>
                    )}
                  </List>
                );
              })}
              <Box
                sx={{
                  mt: '30px',
                  mr: '10px',
                }}
              >
                <Button
                  disabled={pagina === cantHojas}
                  onClick={handleClick}
                  name="mas"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    border: 'none',
                    color: 'white',
                  }}
                >
                  {' '}
                  ᐅ{' '}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: '5px',
              mb: '5px',
            }}
          >
            <Button
              style={{
                backgroundColor: theme.palette.primary.main,
                border: 'none',
                color: 'white',
                borderRadius: '5px',
              }}
              onClick={handleHeight}
            >
              {button}
            </Button>
          </Box>
        </Box>
      </>
    );
  } else {
    return <></>;
  }
};

export default Calendar;
