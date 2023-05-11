const { Router } = require("express");

const {
    postHorarios,
    getHorariosId
} =  require ("../handlers/horarios")

const horariosRouter = Router();

// GET
horariosRouter.get("/:id", getHorariosId);
// horariosRouter.get("/:id", getHorariosId);

// POST
horariosRouter.post("/", postHorarios);

// //PUT
// horariosRouter.put("/", putDoctor);



module.exports = horariosRouter;