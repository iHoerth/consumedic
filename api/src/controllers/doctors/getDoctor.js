const {DoctorType}= require("../../db")

const getDoctor = async (email) => {
    const doctor = await DoctorType.findAll({
        where: {
            email: email
        },
        include: {all: true}
    });
    if(!doctor.length){
        throw new Error(`No se encontró el doctor con el email: ${email}`);
    }
    return doctor;
}

module.exports = { getDoctor };