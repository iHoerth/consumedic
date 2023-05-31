import { Box } from '@mui/material';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import { useTheme } from '@mui/material';

const CardsContainer = ({ doctorsInPage }) => {
  const theme = useTheme();
  const { values } = theme.breakpoints;
  const message = 'No hay medicos con los filtros seleccionados';


  const allMedicos = doctorsInPage.length ? (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        height: 'auto',
        width: {
          mobile: '99.5%',
          tablet: '99.5%',
          laptop: '99.5%',
          desktop: values.desktop,
        },
        p:1,
      }}
    >
      {/* <div className={style.divCards}> */}
      {doctorsInPage.map((doctor) => (
        <Card
          key={doctor.id}
          id={doctor.id}
          profileImage={doctor.imagen}
          name={doctor.nombre + ' ' + doctor.apellido}
          specialty={doctor.Especialidads}
          info={doctor.Descripcion}
          opinions={doctor.Opinions}
          location={doctor.direccion}
          price={doctor.precio}
          agenda={doctor.agenda}
          calendar={doctor.calendar}
          stars={doctor.Opinions}
        />
      ))}
      {/* </div> */}
    </Box>
  ) : (
    <p>{message}</p>
  );
  return <div className={style.divBody}>{allMedicos}</div>;
};

export default CardsContainer;
