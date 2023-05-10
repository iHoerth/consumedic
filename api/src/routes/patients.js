const { Router } = require("express");

const {
    getPatients,
    getPatientsById,
    postPatient,
    putPatient
} =  require ("../handlers/patients")

const pacientsRouter = Router();

// GET
pacientsRouter.get("/", getPatients); // tener en cuenta el query by ?name=....
pacientsRouter.get("/:id", getPatientsById);

// POST
pacientsRouter.post("/", postPatient);

//PUT
pacientsRouter.put("/", putPatient);



module.exports = pacientsRouter;