import React from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

// const useStyles = makeStyles({
//   divBody: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: 20,
//     width: '70%',
//     marginTop: 50,
//   },
//   divCards: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)',
//     gridGap: '8rem',
//     height: 'auto',
//     padding: 10,
//   },
// });

// const CardsContainer = ({ doctorsInPage }) => {
//   console.log(doctorsInPage)
//   const classes = useStyles();
//   const message = "No hay medicos";

//   const allMedicos = doctorsInPage.length ? (
//     <Box className={classes.divCards}>
//       {doctorsInPage.map((doctor) => (
//         <Card
//           key={`doctor${doctor.id}`}
//           id={doctor.id}
//           profileImage={doctor.imagen}
//           name={doctor.nombre + " " + doctor.apellido}
//           specialty={doctor.Especialidads}
//           info={doctor.Descripcion}
//           opinions={doctor.Opinions}
//           location={doctor.direccion}
//           price={doctor.precio}
//           //agenda={doctor.agenda}
//           stars={doctor.Opinions}
//         />
//       ))}
//     </Box>
//   ) : (
//     <p>{message}</p>
//   );
//   return <Box className={classes.divBody}>{allMedicos}</Box>;
// };


const CardsContainer = ({ doctorsInPage }) => {
  const message = "No hay medicos con los filtros seleccionados";

  const allMedicos = doctorsInPage.length ? (
    <div className={style.divCards}>
      {doctorsInPage.map((doctor) => (
        <Card
          key={doctor.id}
          id={doctor.id}
          profileImage={doctor.imagen}
          name={doctor.nombre + " " + doctor.apellido}
          specialty={doctor.Especialidads}
          info={doctor.Descripcion}
          opinions={doctor.Opinions}
          location={doctor.direccion}
          price={doctor.precio}
          //agenda={doctor.agenda}
          stars={doctor.Opinions}
        />
      ))}
    </div>
  ) : (
    <p>{message}</p>
  );
  return <div className={style.divBody}>{allMedicos}</div>;
};

export default CardsContainer;
