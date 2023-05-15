import { useState, useEffect, useContext } from 'react';
import { Context, UtilitiesContext } from '../../context/ContextProvider';
import { Autocomplete, TextField, Box } from '@mui/material';
import { FILTER_TYPES } from '../../helpers/helpers';

const Filter = () => {
  const { socialSecurity, specialties } = useContext(UtilitiesContext);
  const { filteredDoctors, doctors, filterDoctors } = useContext(Context)[0];
  const [selectedFilter, setSelectedFilter] = useState('');

  const [selectedFilter2, setSelectedFilter2] = useState({
    Especialidads: false,
    ObraSocials: false,
    Cita: false,
    location: false,
  });

  const handleFilters = (e, value) => {
    setSelectedFilter2((prevState) => ({
      ...prevState,
      [value]: true,
    }));
  };

  const handleSelectChange = (e, value, reason, filterType) => {
    if (reason === 'clear') {
      setSelectedFilter2((prevState) => ({
        ...prevState,
        [filterType]: false,
      }));
      filterDoctors(doctors);
      return;
    }

    setSelectedFilter2((prevState) => ({
      ...prevState,
      [filterType]: true,
    }));

    
    const newFilter = doctors.filter((doc) =>
      doc[filterType].some((spec) => spec.id === value.id)
    );
    filterDoctors(newFilter);
  };

  const handleSelectClose = () => {
    filterDoctors([]);
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={specialties}
        getOptionLabel={(option) => {
          return option.name;
        }}
        sx={{ width: 340 }}
        renderInput={(params) => <TextField {...params} label="Especialidad" />}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        onChange={(e,value,reason) => handleSelectChange(e,value,reason, FILTER_TYPES.SPECIALTIES)}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={socialSecurity}
        getOptionLabel={(option) => {
          return option.nombre;
        }}
        sx={{ width: 340 }}
        renderInput={(params) => <TextField {...params} label="Obra Social" />}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.nombre}
          </li>
        )}
        onChange={(e,value,reason) => handleSelectChange(e,value,reason, FILTER_TYPES.SOCIAL_SECURITY)}

      />
    </>
  );
};

export default Filter;
