const {DoctorType}= require("../../db")

const getDoctorById = async (id) => {
    
    const doctorinfo = await DoctorType.findOne({
        where: { id },
        include: {all: true}
    });
    if (!doctorinfo) {
        throw new Error('No se encontró el doctor con ese id');
    }
    return doctorinfo;
}

module.exports = { getDoctorById };