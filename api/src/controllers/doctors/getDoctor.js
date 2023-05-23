const {DoctorType}= require("../../db")
const {getDoctorCalendar}=require("../appointments/getDoctorCalendar")
const {getHorariosById}=require("../horarios/getHorariosById")

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
    
    const agenda = await getHorariosById(doctor.id)
    doctor.dataValues.agenda = agenda;
    
    return doctor;
}

module.exports = { getDoctor };