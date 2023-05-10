const { Router } = require("express");

const { getSocialSecurities } = require("../handlers/socialSecurity");

const socialSecurityRouter = Router();

//GET
socialSecurityRouter.get("/", getSocialSecurities);


module.exports = socialSecurityRouter;