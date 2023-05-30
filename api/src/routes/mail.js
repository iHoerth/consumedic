const { Router } = require("express");
const { postMail, postMailToPaciente, postMailDocumento, postMailRespuesta, postMailCita } = require("../handlers/mail");

const mailsRouter = Router();

// POST
mailsRouter.post("/", postMail);
mailsRouter.post("/paciente", postMailToPaciente);
mailsRouter.post("/respuesta", postMailRespuesta);
mailsRouter.post("/documento", postMailDocumento);
mailsRouter.post("/cita", postMailCita);

module.exports = mailsRouter;
