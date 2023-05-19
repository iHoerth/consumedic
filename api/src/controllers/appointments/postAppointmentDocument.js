const {Documento}= require("../../db")

const postAppointmentDocument = async (idCita,imagenCloudinary,idMedico, idPaciente)=>{
    
    const NewDocument = await Documento.create({
        documento: imagenCloudinary,
        DoctorTypeId: idMedico,
        PacienteTypeId: idPaciente,
        CitumId: idCita
    })
    return NewDocument;
}
module.exports = { 
    postAppointmentDocument
 };