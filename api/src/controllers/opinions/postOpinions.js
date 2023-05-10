const {Opinion}= require("../../db")

const getAllOpinions = async (ubicacion, puntaje, mensaje, idMedico, idPaciente) => {
    const newOpinion = await Opinion.create({
        ubicacion, 
        puntaje, 
        mensaje, 
    });
    newOpinion.addDoctorTypes(idMedico);
    newOpinion.addPacienteTypes(idPaciente);
    return newOpinion;
}

module.exports = { getAllOpinions };