import * as React from 'react';
import {
  AppBar,
  Select,
  Toolbar,
  FormControl,
  IconButton,
  Box,
  InputLabel,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Filter from '../Filter/Filter';

const ProminentAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1, width: '68%', borderRadius: '8px' }}>
      <AppBar position="static" style={{ background: '#00E9BC', borderRadius: '10px', padding:'20px 0 20px 0px'}}>
        <Toolbar sx={{gap:'20px'}}>
          <Filter />
          <NavLink to="/search">
            <IconButton
              size="large"
              aria-label="search"
              color="blue"
              sx={{ marginLeft: '5rem', backgroundColor: 'white', borderRadius: '50%' }}
            >
              <SearchIcon />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ProminentAppBar;
