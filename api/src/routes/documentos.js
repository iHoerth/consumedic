const { Router } = require("express");

const {
    getDocumentos,
    postDocumentos
} =  require ("../handlers/documentos")

const documentosRouter = Router();

// GET
documentosRouter.get("/", getDocumentos);

// POST
documentosRouter.post("/", postDocumentos);


module.exports = documentosRouter;