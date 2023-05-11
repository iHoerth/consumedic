const {HistorialMedico, Cita, PacienteTypes}= require("../../db")

const getAllClinicsHistories = async () => {
    const clinicHistories = await HistorialMedico.findAll({
        include: {all: true}
    });
    return clinicHistories;
}

const createHistorialMedic = async(descripcion, fecha,estudio,  documentos,idCita,idPaciente)=>{
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
    getAllClinicsHistories,
    createHistorialMedic
};