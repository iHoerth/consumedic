const { PacienteType, ObraSocial } = require('../../db');

const createPatient = async (
  dni,
  email,
  hashedPassword,
  telefono,
  nombre,
  apellido,
  idObraSocial,
  status
) => {
  const newObraSocial = await ObraSocial.findByPk(idObraSocial);

  const newPatient = await PacienteType.create({
    dni,
    email,
    password: hashedPassword,
    telefono,
    nombre,
    apellido,
    ObraSocialId: newObraSocial?.id,
    status,
  });
  newPatient.password = '';
  return newPatient;
};

module.exports = { createPatient };
