const {Documento}= require("../../db")

const createDocuments = async (idHistorialMedico, idPaciente, idMedico, idCita, documento)=>{
        const newDocumento = await Documento.create({
            documento: documento,
            DoctorTypeId: idMedico,
            PacienteTypeId: idPaciente,
            HistorialMedicoId: idHistorialMedico,
            CitumId: idCita            
    })
    return newDocumento;
}

module.exports = { createDocuments };