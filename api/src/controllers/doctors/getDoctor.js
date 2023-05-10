const {DoctorType}= require("../../db")

const getDoctor = async (name) => {
    const doctor = await DoctorType.findAll({
        where: {
            nombre: name
        },
        include: {all: true}
    });
    if(!doctor.length){
        throw new Error(`No se encontró el doctor con el nombre: ${name}`);
    }
    return doctor;
}

module.exports = { getDoctor };