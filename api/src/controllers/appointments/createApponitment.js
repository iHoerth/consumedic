const {Cita}= require("../../db")

const createAppointment = async (fecha, descripcion)=>{
    
    const NewCita = await Cita.create({
        fecha,
        descripcion
    })
    return NewCita;
}
module.exports = { 
    createAppointment
 };