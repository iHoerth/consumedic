const { Router } = require("express");

const {
    getClinicHistory
} =  require ("../handlers/clinicHistory")

const clinicHistoryRouter = Router();

// GET
clinicHistoryRouter.get("/", getClinicHistory); // tener en cuenta el query by ?name=....

module.exports = clinicHistoryRouter;