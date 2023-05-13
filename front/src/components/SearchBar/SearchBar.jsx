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

const ProminentAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1, width: '65%', borderRadius: '8px' }}>
      <AppBar position="static" style={{ background: '#00B5F9', borderRadius: '10px' }}>
        <Toolbar>
          <FormControl variant="outlined" sx={{ minWidth: 200, marginRight: '3rem' }}>
            <InputLabel id="especialista-label" style={{ color: 'width' }}>
              Especialista
            </InputLabel>
            <Select
              labelId="especialista-label"
              id="especialista-select"
              label="Especialista"
              defaultValue=""
              style={{ color: 'white' }}
            >
              <MenuItem value={10}>Gastroenterólogo</MenuItem>
              <MenuItem value={20}>Médico Clínico</MenuItem>
              <MenuItem value={30}>Odontólogo</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="ubicacion-label" style={{ color: 'width' }}>Ubicación</InputLabel>
            <Select
              labelId="ubicacion-label"
              id="ubicacion-select"
              label="Ubicación"
              defaultValue=""
              style={{ color: 'white' }}
            >
              <MenuItem value={1}>Santa Fe</MenuItem>
              <MenuItem value={2}>Buenos Aires</MenuItem>
              <MenuItem value={3}>Córdoba</MenuItem>
            </Select>
          </FormControl>
          <NavLink to="/search">
            <IconButton size="large" aria-label="search" color="blue" sx={{ marginLeft: '1rem', backgroundColor: '#00D3A4', borderRadius: '50%' }}>
              <SearchIcon />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ProminentAppBar;
