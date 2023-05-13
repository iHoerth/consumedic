import React from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ doctorsInPage }) => {
  const message = "No hay medicos";

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
