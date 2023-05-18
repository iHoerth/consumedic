const {DoctorType}= require("../../db")
const {getDoctorCalendar}=require("../appointments/getDoctorCalendar")

const getDoctor = async (email) => {
    const doctor = await DoctorType.findOne({
        where: {
            email: email
        },
        include: {all: true}
    });
    if(!doctor.id){
        throw new Error(`No se encontró el doctor con el email: ${email}`);
    }
    const calendar = await getDoctorCalendar(doctor.id);
    doctor.dataValues.calendar=calendar;
    return doctor;
}

module.exports = { getDoctor };