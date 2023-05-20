const { Router } = require("express");

const {
    getDoctorsByPatients,
} = require("../handlers/dashboardPaciente")

const dashboardPacienteRouter = Router();

// GET
dashboardPacienteRouter.get("/:id/doctors", getDoctorsByPatients);




module.exports = dashboardPacienteRouter;