const { Cita, DoctorType, ObraSocial, Especialidad, Opinion, Documento } = require("../../db");

const getAllDoctorsByPatient = async (id) => {
  const citas = await Cita.findAll({
    where: { PacienteTypeId: id },
  });

  let doctors = new Set();

  citas.forEach(element => {
    doctors.add(element.DoctorTypeId)
  });
  doctors = [...doctors];
  function compareNumbers(a, b) {
    return a - b;
  }
  doctors.sort(compareNumbers);
  console.log(doctors);
  let doctorDetails = [];
    for(let i=0; i < doctors.length;i++){
        const doctor = await DoctorType.findOne({ 
            where: { 
                id: doctors[i],
                status: "active"
            },
            attributes: {exclude: ['password', "status", "isDoctor"]},
            include: [
              {model: Especialidad},
              {model: ObraSocial},
              {model: Cita,
                where:{
                      PacienteTypeId: id
                },
                include: [
                  {model: Documento}
                ]
              },
            ]
         });

        doctorDetails.push(doctor)
    }
    return doctorDetails;
};

module.exports = { getAllDoctorsByPatient };
