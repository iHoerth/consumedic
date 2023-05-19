const { Cita, PacienteType, Documento } = require("../../db");

const getPatientHistory = async (idMedico, idPaciente) => {

  const citas = await Cita.findAll({
    where: { 
        DoctorTypeId: idMedico,
        PacienteTypeId: idPaciente
     },
  });
  console.log(citas);
  let documentos = []
  for(let i=0;i<citas.length;i++){
    const documentoCita = await Documento.findAll({
      where: {
          CitumId: citas[i].dataValues.id,
          DoctorTypeId: idMedico,
          PacienteTypeId: idPaciente
       },
    });
    documentos.push(documentoCita)
    citas[i].dataValues.documentos=documentoCita;
  }
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