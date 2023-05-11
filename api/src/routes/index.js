const express = require('express');
const app = express();

const doctors = require("./doctors");
const patients = require("./patients");
const socialSecurity = require("./socialSecurity");
const specialties = require("./specialties");
const opinions = require("./opinions");
const clinicHistory = require("./clinicHistory");
const payments = require("./payments");
const createCita = require("./createCita");
const citaRoutes = require('./citaRoutes');
const horarios = require("./horarios")

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

app.use("/doctors", doctors);
app.use("/patients", patients);
app.use("/socialSecurity", socialSecurity);
app.use("/specialties", specialties);
app.use("/opinions", opinions);
app.use("/clinicHistory", clinicHistory);
app.use("/payments", payments);
app.use("/citas", createCita); 
app.use('/citas', citaRoutes);

router.use("/horarios", horarios);



module.exports = router;
