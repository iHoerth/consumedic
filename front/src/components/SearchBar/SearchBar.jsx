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
  const { values } = theme.breakpoints;

  return (
    <AppBar
      color="secondary"
      position="static"
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
      }}
    >
      <Toolbar
        sx={{
          flexDirection: {
            mobile: 'column',
            tablet: 'row',
            laptop: 'row',
            desktop: 'row',
          },
          gap: '20px',
        }}
      >
        <Filter />
        {/* <NavLink to="/search"> */}

        <Box
          onClick={() => handleSearch()}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '3px',
            boxShadow: 'none', // Establece la sombra inicialmente como "none"
            transition: 'box-shadow 0.3s ease', // Añade una transición suave a la sombra
            '&:hover': {
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // Define la sombra al hacer hover
            },
          }}
        >
          <Button sx={{height:'54px', }}>
            <Typography color="white">Buscar</Typography>
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
