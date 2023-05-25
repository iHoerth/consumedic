const { Router } = require("express");
const { postMail, postMailToPaciente, postMailDocumento, postMailRespuesta } = require("../handlers/mail");

const mailsRouter = Router();

// POST
mailsRouter.post("/", postMail);
mailsRouter.post("/paciente", postMailToPaciente);
mailsRouter.post("/respuesta", postMailRespuesta);
mailsRouter.post("/documento", postMailDocumento);


module.exports = mailsRouter;
