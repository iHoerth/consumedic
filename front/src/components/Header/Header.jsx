import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Card, CardActions, CardContent, Typography, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import VideocamIcon from '@mui/icons-material/Videocam';
import ApartmentIcon from '@mui/icons-material/Apartment';

const Header = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: theme.palette.secondary.main,
        opacity: '0.96',
        width: {
          mobile: '100%',
          tablet: 700,
          laptop: 700,
          desktop: 700,
        },
        p: '20px',
        height:'auto',
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: '15px',
          }}
        >
          Consumedic es una web para encontrar profesionales de la salud y agendar turnos al
          instante de manera simple y rápida. Busca el profesional que necesites ahora!
        </Typography>
      </CardContent>

    </Card>
  );
};
export default Header;
