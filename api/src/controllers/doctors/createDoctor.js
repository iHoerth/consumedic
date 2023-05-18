const { DoctorType, Especialidad, ObraSocial } = require("../../db");

const createDoctor = async (
  dni,
  NumMatricula,
  nombre,
  apellido,
  email,
  telefono,
  direccion,
  imagenCloudinary,
  password,
  titulo,
  Descripcion,
  precio,
  idEspecialidad,
  idObraSocial
) => {
  if (!idEspecialidad) {
    throw new Error("Se debe proporcionar al menos una especialidad");
  }
  if (!idObraSocial) {
    throw new Error("Se debe proporcionar al menos una obra social");
  }

  const newDoctor = await DoctorType.create({
    dni,
    NumMatricula,
    nombre,
    apellido,
    email,
    telefono,
    direccion,
    imagen: imagenCloudinary,
    password,
    titulo,
    Descripcion,
    precio,
  });

  if (Array.isArray(idEspecialidad) && idEspecialidad.length > 0) {
    for (let name of idEspecialidad) {
      console.log("name: ", name);
      let idEpecial = name;
      const newEspecialidad = await Especialidad.findAll({
        where: { id: idEpecial },
      });
      console.log("newEspecialidad: ", newEspecialidad);
      newDoctor.addEspecialidads(newEspecialidad);
    }
  } else {
    const newEspecialidad = await Especialidad.findAll({
          where: { id: idEspecialidad },
        });
        newDoctor.addEspecialidads(newEspecialidad);
  }
  // if (idEspecialidad) {
  //   const newEspecialidad = await Especialidad.findAll({
  //     where: { id: idEspecialidad },
  //   });
  //   //console.log("especialidad: ", newEspecialidad);
  //   newDoctor.addEspecialidads(newEspecialidad);
  // }
  if (Array.isArray(idObraSocial) && idObraSocial.length > 0) {
    for (let name of idObraSocial) {
      // console.log("name: ", name);
      let idObra = name;
      const newObraSocial = await ObraSocial.findAll({
        where: { id: idObra },
      });
      console.log("newObraSocial: ", newObraSocial);
      newDoctor.addObraSocials(newObraSocial);
    }
  } else {
      const newObraSocial = await ObraSocial.findAll({
        where: { id: idObraSocial },
      });
      //console.log("obra social: ", newObraSocial);
      newDoctor.addObraSocials(newObraSocial);
  }
  // if (idObraSocial) {
  //   const newObraSocial = await ObraSocial.findAll({
  //     where: { id: idObraSocial },
  //   });
  //   //console.log("obra social: ", newObraSocial);
  //   newDoctor.addObraSocials(newObraSocial);
  // }

  return newDoctor;
};

module.exports = { createDoctor };
