const {PacienteType}= require("../../db")

const getPatient = async (name) => {
    const patient = await PacienteType.findAll({
        where: {
            nombre: name
        },
        include: {all: true}
    });
    if(!patient.length){
        throw new Error(`No se encontró el paciente con el nombre: ${name}`);
    }
    return patient;
}

module.exports = { getPatient };