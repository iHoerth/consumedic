const { Router } = require("express");

const {
    getOpinions,
    getOpinionsByDr,
    postOpinion,
    getOpinionsByPatient
} =  require ("../handlers/opinions")

const opinionsRouter = Router(); 

// GET
opinionsRouter.get("/", getOpinions); // tener en cuenta el query by ?name=....
opinionsRouter.get("/:id", getOpinionsByDr);
opinionsRouter.get("/paciente/:id", getOpinionsByPatient);



//POST
opinionsRouter.post("/", postOpinion); //


module.exports = opinionsRouter;