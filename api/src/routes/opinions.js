const { Router } = require("express");

const {
    getOpinions,
    getOpinionsByDr,
    postOpinion
} =  require ("../handlers/opinions")

const opinionsRouter = Router();

// GET
opinionsRouter.get("/", getOpinions); // tener en cuenta el query by ?name=....
opinionsRouter.get("/:id", getOpinionsByDr);

//POST
opinionsRouter.post("/", postOpinion); //


module.exports = opinionsRouter;