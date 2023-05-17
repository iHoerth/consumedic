const { Router } = require("express");
const { postMail } = require("../handlers/mail");

const mailsRouter = Router();

// POST
mailsRouter.post("/", postMail);

module.exports = mailsRouter;
