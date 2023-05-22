const {Documento}= require("../../db")

const postAppointmentDocument = async (idCita,imagenCloudinary,idMedico, idPaciente, titulo)=>{
    if(!idCita || !imagenCloudinary || !idMedico || !idPaciente || !titulo) throw new Error ("Faltan datos para resitrar el turno")
    else {
        const NewDocument = await Documento.create({
            titulo: titulo,
            documento: imagenCloudinary,
            DoctorTypeId: idMedico,
            PacienteTypeId: idPaciente,
            CitumId: idCita
        })
        return NewDocument;
    }
}
module.exports = { 
    postAppointmentDocument
 };