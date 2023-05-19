const {Cita}= require("../../db")

const getAllAppointments = async ()=>{
    
    const appointments = await Cita.findAll()
    // falta incluir modelo doctro y modelo patient
    return appointments;
}
module.exports = { 
    getAllAppointments
 };