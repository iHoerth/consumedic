const { Cita } = require("../../db");

const getPatientHistory = async (idMedico, idPaciente) => {
  const citas = await Cita.findAll({
    where: { 
        DoctorTypeId: idMedico,
        PacienteTypeId: idPaciente
     },
  });
  return citas;
};

module.exports = { getPatientHistory };