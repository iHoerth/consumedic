const { Router } = require("express");

const {
    postHorarios,
    getHorariosId,
    postHorariosBulk,
    postFirstHorarios
} =  require ("../handlers/horarios")

const horariosRouter = Router();

// GET
horariosRouter.get("/:id", getHorariosId);
// horariosRouter.get("/:id", getHorariosId);

// POST
horariosRouter.post("/", postHorarios);
horariosRouter.post("/bulk/first", postFirstHorarios);
horariosRouter.post("/bulk", postHorariosBulk);



// //PUT
// horariosRouter.put("/", putDoctor);



module.exports = horariosRouter;