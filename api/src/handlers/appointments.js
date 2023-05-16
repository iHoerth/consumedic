const { createAppointment } = require("../controllers/appointments/createApponitment")
const { getAllAppointments } = require("../controllers/appointments/getAllAppointments")
const { getAppointmentsByDoctor } = require("../controllers/appointments/getAppointmentsByDoctor")
const { getAppointmentsByPatient } = require("../controllers/appointments/getAppointmentsByPatient")
const { getDoctorCalendar}=require("../controllers/appointments/getDoctorCalendar")

const getAppointments = async (req, res) =>{
    try {
        const result = await getAllAppointments()
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getAppointmentsDoctor = async (req, res) =>{
    try {
        const {id}=req.params;
        const result = await getAppointmentsByDoctor(id)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getAppointmentsPatient = async (req, res) =>{
    try {
        const {id}=req.params;
        const result = await getAppointmentsByPatient(id)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getCalendar = async (req, res) =>{
    try {
        const {id}=req.params;
        const result = await getDoctorCalendar(id)
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
    createAppointments,
    getAppointmentsDoctor,
    getAppointmentsPatient,
    getCalendar
}