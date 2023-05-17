import { Box } from '@mui/material';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import { useTheme } from '@mui/material';

const CardsContainer = ({ doctorsInPage }) => {
  const theme = useTheme();
  const message = 'No hay medicos con los filtros seleccionados';

  const allMedicos = doctorsInPage.length ? (
    <Box
      component="div"
      sx={{
        display: {
          mobile: 'flex',
          tablet: 'flex',
          laptop: 'flex',
          desktop: 'grid',
        },
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '8rem',
        flexDirection: 'column',
        gap: '14px',
        height: 'auto',
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
          //agenda={doctor.agenda}
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
