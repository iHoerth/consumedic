const {Pago, Cita}= require("../../db")

const createPayments = async (precio, medioDeOPago,idCita)=>{
    const NewCita = await Cita.findByPk(idCita)
    const NewPago = await Pago.create({
        precio,
        medioDeOPago,
        CitumId: NewCita.id
    })
    return NewPago;
}
module.exports = { 
    createPayments
 };