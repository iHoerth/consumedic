
const {getAllPayments} = require("../controllers/payments/getAllPayments")
const {createPayments} = require("../controllers/payments/createPayments")

const getPayments = async (req, res)=>{
    try {
        const result = await getAllPayments();
        res.status(200).send("estoy en pagos wi");
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postPayments = async ( req,res)=>{
    const {precio, medioDeOPago, idCita} = req.body;
    try {
        const pago = await createPayments(precio,medioDeOPago,idCita)
        res.status(200).json(pago)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    getPayments,
    postPayments
}