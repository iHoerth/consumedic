const {Cita}= require("../../db")

const getAllAppointments = async ()=>{
    
    const appointments = await Cita.findAll()
    if(!appointments.length) throw new Error("No se encontraron citas")
    else return appointments;
}
module.exports = { 
    getAllAppointments
 };