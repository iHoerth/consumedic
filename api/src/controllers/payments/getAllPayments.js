const {Pago}= require("../../db")
const {Cita}= require("../../db")

const getAllPayments = async () => {
    const payments = await Pago.findAll({
        include: {all: true}
    });
    return payments;
}

const createPayments = async (precio, medioDeOPago,idCita)=>{
    const NewCita = await Cita.findByPk(idCita)
    const NewPago = await Pago.create({
        precio,
        medioDeOPago,
        CitumId: NewCita.id
    })
return NewPago

}

module.exports = { 
    getAllPayments,
    createPayments
 };