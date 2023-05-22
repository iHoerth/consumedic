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
  // sort citas

  citas.sort((a,b)=>{
    const aFecha = a.fecha.split("-")
    const bFecha = b.fecha.split("-")
    const aHora = a.hora.split(":")
    const bHora = b.hora.split(":")
    if (bFecha[0] < aFecha[0]) return 1;
    if (bFecha[0] === aFecha[0] && bFecha[1] < aFecha[1]) return 1;
    if (bFecha[0] === aFecha[0] && bFecha[1] === aFecha[1] && bFecha[2] < aFecha[2]) return 1;
    if (bFecha[0] === aFecha[0] && bFecha[1] === aFecha[1] && bFecha[2] === aFecha[2]) {
      if (Number(bHora[0]) < Number(aHora[0])) return 1;
      if (Number(bHora[0]) === Number(aHora[0]) && Number(bHora[1]) <= Number(aHora[1])) {
        return 1;
      }
    }
    return -1;
  })

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