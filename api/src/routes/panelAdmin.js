const { Router } = require("express");

const {
    setAdmin
} =  require ("../handlers/panelAdmin")

const panelAdminRouter = Router();


// PUT
panelAdminRouter.put("/newAdmin", setAdmin);


module.exports = panelAdminRouter;