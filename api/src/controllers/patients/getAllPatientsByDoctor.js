const { Cita, PacienteType, ObraSocial } = require("../../db");

const getAllPatientsByDoctor = async (id) => {
  const citas = await Cita.findAll({
    where: { DoctorTypeId: id },
  });

  let patients = new Set();

  citas.forEach(element => {
    patients.add(element.PacienteTypeId)
  });
  patients = [...patients];
  function compareNumbers(a, b) {
    return a - b;
  }
  patients.sort(compareNumbers);

  let patientsDetails = [];
    for(let i=0; i < patients.length;i++){
        const paciente = await PacienteType.findOne({ 
            where: { 
                id: patients[i],
                status: "active"
            },
            attributes: {exclude: ['password', "status", "isDoctor"]},
         });
         const obraSocial = await ObraSocial.findOne({
            where: {
              id: paciente.ObraSocialId
            }
         })
         paciente.ObraSocialId=obraSocial
        patientsDetails.push(paciente)
    }
    return patientsDetails;
};

module.exports = { getAllPatientsByDoctor };
