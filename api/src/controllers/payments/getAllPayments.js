const {Pago}= require("../../db")
const {Cita}= require("../../db")

const getAllPayments = async () => {
    const payments = await Pago.findAll({
        include: {all: true}
    });
    return payments;
}

module.exports = { 
    getAllPayments,
};