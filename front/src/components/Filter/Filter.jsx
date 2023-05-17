import { useState, useEffect, useContext } from 'react';
import { Context, UtilitiesContext } from '../../context/ContextProvider';
import { Autocomplete, TextField, Box } from '@mui/material';
import { FILTER_TYPES } from '../../helpers/helpers';

import { FilterContext } from '../../context/ContextProvider';
import { useTheme } from '@mui/material';
import theme from '../../theme';

const Filter = ({ handlePageChange }) => {
  const theme = useTheme();
  const { socialSecurity, specialties } = useContext(UtilitiesContext);
  const { filteredDoctors, doctors, filterDoctors } = useContext(Context)[0];
  const [selectedFilters, setSelectedFilters] = useContext(FilterContext);

  const handleSelectChange = (e, value, reason, filterType) => {
    handlePageChange && handlePageChange(e, 1);
    if (reason === 'clear') {
      setSelectedFilters((prevState) => ({
        ...prevState,
        [filterType]: [false, {}],
      }));
    } else {
      setSelectedFilters((prevState) => ({
        ...prevState,
        [filterType]: [true, value],
      }));
    }
  };

  const handleNewFilters = async () => {
    //Creo una copia de todos los doctores
    let newDoctors = [...doctors];
    for (const key in FILTER_TYPES) {
      // Itero en las keys de mi Filter types, para buscar en el estado las tuplas.
      // Las que tengan el flag en true, entran y comparan su objeto value contra el del current doc
      console.log(selectedFilters[FILTER_TYPES[key]], `tupla de filtros`);
      const [flag, value] = selectedFilters[FILTER_TYPES[key]];
      if (flag) {
        newDoctors = newDoctors.filter((doc) =>
          // Aplico un filter + some utlizando justamente el key, que coincide con el nombre del atributo que quiero buscar.
          doc[FILTER_TYPES[key]].some((filterCategory) => filterCategory.id === value.id)
        );
      }
    }
    console.log(`NEW FILTER \n`, newDoctors);
    // 'despacho' la accion que setea el nuevo filtro de doctores
    filterDoctors(newDoctors);
    // lo retorno por si llegara a ser necesario
    return newDoctors;
  };

  useEffect(() => {
    handleNewFilters();
    console.log(`*USE EFFECT CALL* \n`);
  }, [selectedFilters]);

  return (
    <Box
      color="inherit"
      size="large"
      component="div"
      display="flex"
      flexDirection="row"
      justifyContent='center'
      gap="20px"
      sx={{
        width: {
          desktop: '600px',
        },
      }}
    >
      <Autocomplete
        sx={{
          width: 240,
        }}
        disablePortal
        id="combo-box-demo"
        options={specialties}
        getOptionLabel={(option) => {
          return option.name;
        }}
        renderInput={(params) => (
          <TextField
            sx={{ bgcolor: 'white', borderRadius: '4px' }}
            {...params}
            label="Especialidad"
          />
        )}
        renderOption={(props, option) => (
          <li style={{ fontSize: '14px' }} {...props} key={option.id}>
            {option.name}
          </li>
        )}
        onChange={(e, value, reason) =>
          handleSelectChange(e, value, reason, FILTER_TYPES.SPECIALTIES)
        }
        value={
          selectedFilters[FILTER_TYPES.SPECIALTIES][0]
            ? selectedFilters[FILTER_TYPES.SPECIALTIES][1]
            : null
        }
      />
      <Autocomplete
        sx={{ width: 240 }}
        disablePortal
        id="combo-box-demo"
        options={socialSecurity}
        getOptionLabel={(option) => {
          return option.nombre;
        }}
        renderInput={(params) => (
          <TextField
            sx={{ bgcolor: 'white', borderRadius: '4px' }}
            {...params}
            label="Obra Social"
          />
        )}
        renderOption={(props, option) => (
          <li style={{ fontSize: '14px' }} {...props} key={option.id}>
            {option.nombre}
          </li>
        )}
        onChange={(e, value, reason) =>
          handleSelectChange(e, value, reason, FILTER_TYPES.SOCIAL_SECURITY)
        }
        value={
          selectedFilters[FILTER_TYPES.SOCIAL_SECURITY][0]
            ? selectedFilters[FILTER_TYPES.SOCIAL_SECURITY][1]
            : null
        }
      />
    </Box>
  );
};

export default Filter;
