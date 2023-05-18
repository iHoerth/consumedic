const { Router } = require("express");

const {
    getPatientsByDoctor,
    getHistorialPaciente
} = require("../handlers/dashboardMedico");

const dashboardMedicoRouter = Router();

// GET
dashboardMedicoRouter.get("/:id/pacientes", getPatientsByDoctor);
dashboardMedicoRouter.get("/:idMedico/pacientes/:idPaciente", getHistorialPaciente);


module.exports = dashboardMedicoRouter;