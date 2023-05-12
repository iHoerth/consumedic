const {Cita}= require("../../db")

const getAllAppointments = async ()=>{
    
    const appointments = await Cita.findAll({
        include: {all: true}
    })
    return appointments;
}
module.exports = { 
    getAllAppointments
 };