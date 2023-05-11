const { createAppointment } = require("../controllers/appointments/createApponitment")
const { getAllAppointments } = require("../controllers/appointments/getAllAppointments")

const getAppointments = async (req, res) =>{
    try {
        const result = await getAllAppointments()
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


const createAppointments = async (req, res) => {
    const { fecha, descripcion } = req.body;
    try {
        const result = await createAppointment(fecha, descripcion);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAppointments,
    createAppointments
}