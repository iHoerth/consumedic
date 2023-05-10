const { Router } = require("express");

const {
    getClinicHistory,
    postClinicHistory
} =  require ("../handlers/clinicHistory")

const clinicHistoryRouter = Router();

// GET
clinicHistoryRouter.get("/", getClinicHistory); // tener en cuenta el query by ?name=....

//POST 
clinicHistoryRouter.post("/", postClinicHistory); 


module.exports = clinicHistoryRouter;