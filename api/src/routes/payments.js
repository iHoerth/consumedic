const { Router } = require("express");

const {
    getPayments,
    postPayments
} =  require ("../handlers/payments")

const paymentsRouter = Router();

// GET
paymentsRouter.get("/", getPayments);

//POST 
paymentsRouter.post("/", postPayments);

module.exports = paymentsRouter;