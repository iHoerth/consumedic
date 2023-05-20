const {Documento}= require("../../db")

const postAppointmentDocument = async (idCita,imagenCloudinary,idMedico, idPaciente, titulo)=>{
    
    const NewDocument = await Documento.create({
        titulo: titulo,
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