const {PacienteType}= require("../../db")

const getPatientById = async (id) => {
    const patient = await PacienteType.findOne({
        where: { id },
        include: {all: true}
    });
    if (!patient) {
        throw new Error('No se encontró el paciente con ese id');
    }
    return patient;
}

module.exports = { getPatientById };