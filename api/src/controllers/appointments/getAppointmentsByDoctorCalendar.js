const {Cita, PacienteType}= require("../../db")

const getAppointmentsByDoctorCalendar = async (idDoctor)=>{
    if(!idDoctor) throw new Error("Falta ID del Doctor para obtener los turnos")
    else {
        let appointments = await Cita.findAll({
            where: { DoctorTypeId: idDoctor },
        })
        
        return appointments
    }
}
module.exports = { 
    getAppointmentsByDoctorCalendar
 };