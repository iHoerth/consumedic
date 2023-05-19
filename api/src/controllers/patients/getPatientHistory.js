const { Cita, PacienteType } = require("../../db");

const getPatientHistory = async (idMedico, idPaciente) => {

  const citas = await Cita.findAll({
    where: { 
        DoctorTypeId: idMedico,
        PacienteTypeId: idPaciente
     },
  });
  const paciente = await PacienteType.findOne({ 
    where: { 
        id: idPaciente,
    },
    attributes: {exclude: ['password', "status", "isDoctor"]},
 });
 const result ={
  citas,
  paciente
 }
  return result;
};

module.exports = { getPatientHistory };