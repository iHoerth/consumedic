const { Router } = require("express");
const { loginPatient } = require("../handlers/auth");

const {
  getPatients,
  getPatientsById,
  postPatient,
  putPatient,
} = require("../handlers/patients");

const patientsRouter = Router();

// GET
patientsRouter.get("/", getPatients); // tener en cuenta el query by ?name=....
patientsRouter.get("/:id", getPatientsById);

// POST
patientsRouter.post("/", postPatient);
patientsRouter.post("/login", loginPatient);

//PUT
patientsRouter.put("/", putPatient);

module.exports = patientsRouter;
