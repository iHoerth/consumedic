const {Documento}= require("../../db")

const createDocuments = async (idCita, imagenCloudinary, idMedico, idPaciente, titulo)=>{
        const newDocumento = await Documento.create({
            documento: imagenCloudinary,
            DoctorTypeId: idMedico,
            PacienteTypeId: idPaciente,
            CitumId: idCita,
            titulo: titulo
    })
    return newDocumento;
}

module.exports = { createDocuments };