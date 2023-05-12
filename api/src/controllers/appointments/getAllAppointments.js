const {Cita}= require("../../db")

const getAllAppointments = async ()=>{
    
    const appointments = await Cita.findAll()
    return appointments;
}
module.exports = { 
    getAllAppointments
 };