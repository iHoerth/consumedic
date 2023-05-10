const {Opinion,DoctorType,PacienteType}= require("../../db")

const postOpinions = async (ubicacion, puntaje, mensaje, idMedico, idPaciente) => {
    const newPacient = await PacienteType.findByPk(idPaciente);
    const newDoctor = await DoctorType.findByPk(idMedico);

    const newOpinion = await Opinion.create({
        ubicacion, 
        puntaje, 
        mensaje, 
        DoctorTypeId: newDoctor.id,
        PacienteTypeId: newPacient.id
    });
    return newOpinion;
}

module.exports = { postOpinions };