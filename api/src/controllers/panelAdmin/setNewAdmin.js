const { PacienteType } = require("../../db");

const setNewAdmin = async (id) => {
  let patient = await PacienteType.findByPk(id, {
    include: { all: true },
  });
  let patientCompare = patient.status;
  if(patient.admin){
    patient.admin=false
  } else {
    patient.admin=true
  }
  await patient.save();

  return patient;
};

module.exports = { setNewAdmin };
