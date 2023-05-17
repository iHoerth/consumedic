import * as React from 'react';
import { AppBar, Button, Toolbar, IconButton, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Filter from '../Filter/Filter';
import { useTheme } from '@mui/material/styles';
import theme from '../../theme';

const SearchBar = ({ handleSearch }) => {
  const theme = useTheme();
  return (
    <AppBar
      color="secondary"
      position="static"
      style={{ width: '700px', padding: '20px 0 20px 0px' }}
    >
      <Toolbar sx={{ gap: '20px' }}>
        <Filter />
        {/* <NavLink to="/search"> */}
        <Button variant="contained" onClick={() => handleSearch()}>
          <Typography color="white">Buscar</Typography>
          <IconButton aria-label="search" color="blue">
            <SearchIcon sx={{ color: 'white' }} />
          </IconButton>
        </Button>
        {/* </NavLink> */}
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
