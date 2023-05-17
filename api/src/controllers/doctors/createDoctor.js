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
  hashedPassword,
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
    password: hashedPassword,
    titulo,
    Descripcion,
    precio,
  });

  if (idEspecialidad) {
    const newEspecialidad = await Especialidad.findAll({
      where: { id: idEspecialidad },
    });
    //console.log("especialidad: ", newEspecialidad);
    newDoctor.addEspecialidads(newEspecialidad);
  }

  if (idObraSocial) {
    const newObraSocial = await ObraSocial.findAll({
      where: { id: idObraSocial },
    });
    //console.log("obra social: ", newObraSocial);
    newDoctor.addObraSocials(newObraSocial);
  }

  return newDoctor;
};

module.exports = { createDoctor };
