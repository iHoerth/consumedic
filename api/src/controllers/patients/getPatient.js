const {PacienteType}= require("../../db")

const getPatient = async (email) => {
    const patient = await PacienteType.findAll({
        where: {
            email: email
        },
        include: {all: true}
    });
    if(!patient.length){
        throw new Error(`No se encontró el paciente con el email: ${email}`);
    }
    return patient[0];
}

module.exports = { getPatient };