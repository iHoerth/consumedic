const { Router } = require("express");

const { getSpecialties } = require("../handlers/specialties");

const specialtiesRouter = Router();

//GET
specialtiesRouter.get("/", getSpecialties);


module.exports = specialtiesRouter;