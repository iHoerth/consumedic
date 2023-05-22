const {Cita}= require("../../db")

const getAppointmentsByPatient = async (idPatient)=>{
    if(!idPatient) throw new Error("Faltan ID del Paciente para obtener los turnos")
    else {
        const appointments = await Cita.findAll({
            where: { DoctorTypeId: idPatient },
        })
        if(appointments.length) return appointments;
        else throw new Error("No hay turnos registrados")
    }
}   
module.exports = { 
    getAppointmentsByPatient
 };