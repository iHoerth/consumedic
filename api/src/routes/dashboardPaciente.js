const { Router } = require("express");

const {
    getDoctorsByPatients,
} = require("../handlers/dashboardPaciente")

const dashboardPacienteRouter = Router();

// GET
dashboardPacienteRouter.get("/doctors", getDoctorsByPatients);




module.exports = dashboardPacienteRouter;