const { Router } = require("express");

const {
    getPatientsByDoctor,
    getHistorialPaciente,
    postDoctorResponse,
    postDoctorDocument

} = require("../handlers/dashboardMedico");

const dashboardMedicoRouter = Router();

// GET
dashboardMedicoRouter.get("/:id/pacientes", getPatientsByDoctor);
dashboardMedicoRouter.get("/:idMedico/pacientes/:idPaciente", getHistorialPaciente);

//POST
dashboardMedicoRouter.post("/doctor/cita/respuesta", postDoctorResponse);
dashboardMedicoRouter.post("/doctor/cita/documento", postDoctorDocument);



module.exports = dashboardMedicoRouter;