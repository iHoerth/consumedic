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
import { Context, UtilitiesContext } from '../../context/ContextProvider';
import { Autocomplete, TextField } from '@mui/material';

const Filter = () => {
  const { socialSecurity, specialties } = useContext(UtilitiesContext);
  const [doctorsData] = useContext(Context);
  const { filteredDoctors, doctors, filterDoctors } = doctorsData;

  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilters = () => {};

  const handleSelectChange = (e, value) => {
    setSelectedFilter(value);
    console.log(value);
    const newFilter = doctors.filter((doc) =>
      doc.Especialidads.some((spec) => spec.id === value.id)
    );
    filterDoctors(newFilter)
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={specialties}
      getOptionLabel={(option) => {
        return option.name;
      }}
      sx={{ width: 340 }}
      // getOptionSelected={(option, value) => option.id === value[0].id}
      renderInput={(params) => <TextField {...params} label="Especialidad" />}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.name}
        </li>
      )}
      onChange={handleSelectChange}
    />
  );
};

export default Filter;
