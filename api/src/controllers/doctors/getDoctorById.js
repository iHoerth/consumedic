const {DoctorType}= require("../../db")
const {getDoctorCalendar}=require("../appointments/getDoctorCalendar")

const getDoctorById = async (id) => {
    const calendar = await getDoctorCalendar(id);
    const doctorinfo = await DoctorType.findOne({
        where: { id },
        include: {all: true}
    });
    if (!doctorinfo) {
        throw new Error('No se encontró el doctor con ese id');
    }
    doctorinfo.dataValues.calendar=calendar;
    return doctorinfo;
}

module.exports = { getDoctorById };