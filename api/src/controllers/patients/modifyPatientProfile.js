const { PacienteType } = require("../../db");

const modifyPatientProfile = async ({
  id,
  dni,
  email,
  telefono,
  nombre,
  apellido,
}) => {
  let patient = await PacienteType.findByPk(id);
  console.log(id, dni, email, telefono, nombre, apellido);

  if (patient) {
    let newPatient = await patient.update({
      dni,
      email,
      telefono,
      nombre,
      apellido,
    });
    return newPatient;
  } else {
    return "No existe ese paciente";
  }
};

module.exports = { modifyPatientProfile };
