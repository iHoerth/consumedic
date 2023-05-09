

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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const AppHeader = styled(AppBar)(({ theme }) => ({
  background: '#90a4ae',
  boxShadow: 'none',
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

export default function ProminentAppBar() {
  return (
    <Box sx={{ flexGrow: 1, width: '600px'}}>
      <AppHeader position="static">
        <StyledToolbar>
          <FormControl sx={{ minWidth: 120 , color: 'white'}}>
            <InputLabel sx={{ color: 'white'}} id="especialista-label">Especialista</InputLabel>
            <Select
              labelId="especialista-label"
              id="especialista-select"
              label="Especialista"
              defaultValue=""
              sx={{ color: 'white'}}
            >
              <MenuItem value={10}>Gastroenterólogo</MenuItem>
              <MenuItem value={20}>Médico Clínico</MenuItem>
              <MenuItem value={30}>Odontólogo</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: 'white'}} id="ubicacion-label">Ubicación</InputLabel>
            <Select
              labelId="ubicacion-label"
              id="ubicacion-select"
              label="Ubicación"
              defaultValue=""
              sx={{ color: 'white'}}
            >
              <MenuItem value={1}>Ciudad Autónoma de Buenos Aires</MenuItem>
              <MenuItem value={2}>Buenos Aires</MenuItem>
              <MenuItem value={3}>Córdoba</MenuItem>
            </Select>
          </FormControl>
          <NavLink to="/all" activeClassName="active">
      <   IconButton size="large" aria-label="search" color="inherit">
        <SearchIcon />
         </IconButton>
       </NavLink>
        </StyledToolbar>
      </AppHeader>
    </Box>
  );
}