const {Cita}= require("../../db")

const getAppointmentsByPatient = async (idPatient)=>{
    
    const appointments = await Cita.findAll({
        where: { DoctorTypeId: idPatient },
    })
    return appointments;
}
module.exports = { 
    getAppointmentsByPatient
 };