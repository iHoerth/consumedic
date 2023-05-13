import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

const ProminentAppBar = () => {
  const theme = useTheme();

  return (
    <Box sx={{  width: '70%' }}>
      <AppBar position="static">
        <Toolbar color="secondary">
          <FormControl sx={{ minWidth: 150, color: 'white' }}>
            <InputLabel id="especialista-label">Especialista</InputLabel>
            <Select
              
              labelId="especialista-label"
              id="especialista-select"
              label="Especialista"
              defaultValue=""
            >
              <MenuItem value={10}>Gastroenterólogo</MenuItem>
              <MenuItem value={20}>Médico Clínico</MenuItem>
              <MenuItem value={30}>Odontólogo</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="ubicacion-label">Ubicación</InputLabel>
            <Select
              labelId="ubicacion-label"
              id="ubicacion-select"
              label="Ubicación"
              defaultValue=""
            >
              <MenuItem value={1}>Santa Fe</MenuItem>
              <MenuItem value={2}>Buenos Aires</MenuItem>
              <MenuItem value={3}>Córdoba</MenuItem>
            </Select>
          </FormControl>
          <NavLink to="/search">
            <IconButton size="large" aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ProminentAppBar;
