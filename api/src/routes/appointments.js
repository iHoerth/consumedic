const { Router } = require("express");

const { createAppointments, getAppointments, getAppointmentsDoctor, getAppointmentsPatient, getCalendar } = require('../handlers/appointments');

const appointmentsRouter = Router();

// POST
appointmentsRouter.post('/', createAppointments);

// GET
appointmentsRouter.get('/', getAppointments);
appointmentsRouter.get('/doctor/:id', getAppointmentsDoctor);
appointmentsRouter.get('/patient/:id', getAppointmentsPatient);
appointmentsRouter.get('/calendar/:id', getCalendar);

module.exports = appointmentsRouter;