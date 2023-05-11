const express = require('express');
const app = express();

const doctors = require("./doctors");
const patients = require("./patients");
const socialSecurity = require("./socialSecurity");
const specialties = require("./specialties");
const opinions = require("./opinions");
const clinicHistory = require("./clinicHistory");
const payments = require("./payments");
const horarios = require("./horarios")
const createCita = require("./createCita");
const citaRoutes = require('./citaRoutes');

//!fake data
const { createFakeData } = require("../fakeData/fakeData");

app.post("/fake", async (req, res) => {
  try {
    await createFakeData();
    return res.status(200).send("data created");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});


router.use("/clinicHistory", clinicHistory);
router.use("/payments", payments);

router.use("/horarios", horarios);



module.exports = app;
