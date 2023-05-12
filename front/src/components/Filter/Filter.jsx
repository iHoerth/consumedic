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
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/ContextProvider';

const Filter = () => {
  const [doctorsData] = useContext(Context);
  const {filteredDoctors, doctors, } = doctorsData;

  const handleChange = () => {

  }


  return (
    <Box sx={{ flexGrow: 1, width: '50%' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value=''
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
