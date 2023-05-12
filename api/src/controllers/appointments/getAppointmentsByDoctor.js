const {Cita}= require("../../db")

const getAppointmentsByDoctor = async (idDoctor)=>{
    
    const appointments = await Cita.findAll({
        where: { DoctorTypeId: idDoctor },
    })
    return appointments;
}
module.exports = { 
    getAppointmentsByDoctor
 };