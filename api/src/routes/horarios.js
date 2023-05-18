const { Router } = require("express");

const {
    postHorarios,
    getHorariosId,
    postHorariosBulk
} =  require ("../handlers/horarios")

const horariosRouter = Router();

// GET
horariosRouter.get("/:id", getHorariosId);
// horariosRouter.get("/:id", getHorariosId);

// POST
horariosRouter.post("/", postHorarios);
horariosRouter.post("/bulk", postHorariosBulk);



// //PUT
// horariosRouter.put("/", putDoctor);



module.exports = horariosRouter;