const {HistorialMedico, Cita, PacienteTypes}= require("../../db")

const createClinicHistory = async(descripcion, fecha,estudio,  documentos,idCita,idPaciente)=>{
    const NewCita = await Cita.findByPk(idCita);
    const NewPacient = await PacienteTypes.findByPk(idPaciente);
    const NewHistorial = await HistorialMedico.create({
        descripcion,
        estudio,
        fecha,
        documentos,
        
    })
    return NewHistorial
}

module.exports = { 
    createClinicHistory
};