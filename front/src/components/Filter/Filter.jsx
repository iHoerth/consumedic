import { useState, useEffect, useContext } from 'react';
import { Context, UtilitiesContext } from '../../context/ContextProvider';
import { Autocomplete, TextField } from '@mui/material';

const Filter = () => {
  const { socialSecurity, specialties } = useContext(UtilitiesContext);
  const { filteredDoctors, doctors, filterDoctors } = useContext(Context)[0];

  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSelectChange = (e, value, reason) => {
    if (reason === 'clear') {
      setSelectedFilter('');
      filterDoctors(doctors);
      return;
    }
    setSelectedFilter(value);
    console.log(value);
    const newFilter = doctors.filter((doc) =>
      doc.Especialidads.some((spec) => spec.id === value.id)
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
        onChange={handleSelectChange}
      />
    </>
  );
};

export default Filter;
