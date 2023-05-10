const { Router } = require("express");

const {
    getOpinions
} =  require ("../handlers/opinions")

const opinionsRouter = Router();

// GET
opinionsRouter.get("/", getOpinions); // tener en cuenta el query by ?name=....

module.exports = opinionsRouter;