const { Router } = require("express");

const {
    getPayments
} =  require ("../handlers/payments")

const paymentsRouter = Router();

// GET
paymentsRouter.get("/", getPayments);

module.exports = paymentsRouter;