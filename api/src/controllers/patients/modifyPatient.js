const { PacienteType } = require("../../db");

const modifyPatient = async (id, status) => {
  let patient = await PacienteType.findByPk(id, {
    include: { all: true },
  });
  let patientCompare = patient.status;
  patient.status = status;
  await patient.save();
  if (patientCompare === patient.status) {
    throw new Error("No se actualizó el status del paciente");
  }
  return patient;
};

module.exports = { modifyPatient };
