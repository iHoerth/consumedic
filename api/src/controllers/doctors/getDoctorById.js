const {DoctorType}= require("../../db")
const {getDoctorCalendar}=require("../appointments/getDoctorCalendar")
const {getHorariosById}=require("../horarios/getHorariosById")

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
    const agenda = await getHorariosById(id)
    doctorinfo.dataValues.agenda = agenda;
    return doctorinfo;
}

module.exports = { getDoctorById };