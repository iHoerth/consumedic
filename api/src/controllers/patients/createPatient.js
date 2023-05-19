const {PacienteType, ObraSocial}= require("../../db")

const createPatient = async (dni, email, hashedPassword, telefono, nombre, apellido, idObraSocial) => {
    const newObraSocial = await ObraSocial.findByPk(idObraSocial);
    
    const newPatient = await PacienteType.create({
        dni, 
        email,
        password: hashedPassword,
        telefono,
        nombre,
        apellido,
        ObraSocialId: newObraSocial.id
    })
    newPatient.password="";
    return newPatient
}

module.exports = { createPatient };


// const createPatient = async (dni, email, hashedPassword, telefono, nombre, apellido, idObraSocial) => {
//     try {
//       let patient = await PacienteType.findOne({ where: { email } });
  
//       if (!patient) {
//         const newObraSocial = await ObraSocial.findByPk(idObraSocial);
  
//         patient = await PacienteType.create({
//           dni,
//           email,
//           password: hashedPassword,
//           telefono,
//           nombre,
//           apellido,
//           ObraSocialId: newObraSocial.id
//         });
//       }
  
//       patient.password = "";
//       return patient;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to create patient");
//     }
//   };
  
//   module.exports = { createPatient };
  