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

        <Box onClick={() => handleSearch()}
          sx={{
            width: '140px',
            height: '53px',
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '3px',
            boxShadow: 'none', // Establece la sombra inicialmente como "none"
            transition: 'box-shadow 0.3s ease', // Añade una transición suave a la sombra
            '&:hover': {
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // Define la sombra al hacer hover
            },
          }}>
          <Button>
            <Typography color='white'>Buscar</Typography>
          </Button>
          <IconButton aria-label="search" color="blue">
            <SearchIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        {/* </NavLink> */}
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
