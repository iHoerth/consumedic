const { PacienteType } = require("../../db");

const modifyPatientProfile = async ({
  id,
  dni,
  email,
  telefono,
  nombre,
  apellido,
  ObraSocialId,
}) => {
  let patient = await PacienteType.findByPk(id);

  if (patient) {
    let newPatient = await patient.update({
      dni,
      email,
      telefono,
      nombre,
      apellido,
      ObraSocialId,
    });
    return newPatient;
  } else {
    return "No existe ese paciente";
  }
};

module.exports = { modifyPatientProfile };
