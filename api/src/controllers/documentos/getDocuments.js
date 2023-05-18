const {Documento}= require("../../db")

const getDocuments = async (idHistorialMedico, idPaciente, idMedico, idCita)=>{
    const documentos = await Documento.findAll({
        where: { 
            DoctorTypeId: idMedico,
            PacienteTypeId: idPaciente,
            HistorialMedicoId: idHistorialMedico,
            CitumId: idCita        
        }
    });
    return documentos;
}
module.exports = { getDocuments };