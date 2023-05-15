import { useState, useEffect, useContext } from 'react';
import { Context, UtilitiesContext } from '../../context/ContextProvider';
import { Autocomplete, TextField, Box } from '@mui/material';
import { FILTER_TYPES } from '../../helpers/helpers';

const Filter = () => {
  const { socialSecurity, specialties } = useContext(UtilitiesContext);
  const { filteredDoctors, doctors, filterDoctors } = useContext(Context)[0];
  const [selectedFilters, setSelectedFilters] = useState({
    Especialidads: [false, {}],
    ObraSocials: [false, {}],
    Cita: [false, {}],
    location: [false, {}],
  });

  const handleSelectChange = (e, value, reason, filterType) => {
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
    console.log(`NUEVO FILTRO \n`, newDoctors);
    // 'despacho' la accion que setea el nuevo filtro de doctores
    filterDoctors(newDoctors);
    // lo retorno por si llegara a ser necesario
    return newDoctors;
  };

  useEffect(() => {
    handleNewFilters();
    console.log(`*USE EFFECT* \n`);
  }, [selectedFilters]);

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
        onChange={(e, value, reason) =>
          handleSelectChange(e, value, reason, FILTER_TYPES.SPECIALTIES)
        }
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
        onChange={(e, value, reason) =>
          handleSelectChange(e, value, reason, FILTER_TYPES.SOCIAL_SECURITY)
        }
      />
    </>
  );
};

export default Filter;
