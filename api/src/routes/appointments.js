const { Router } = require("express");

const { createAppointments, getAppointments } = require('../handlers/appointments');

const appointmentsRouter = Router();

// Ruta para crear una cita
appointmentsRouter.post('/', createAppointments);

// Ruta para obtener todas las citas
appointmentsRouter.get('/', getAppointments);


module.exports = appointmentsRouter;