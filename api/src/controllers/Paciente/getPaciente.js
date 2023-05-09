const { PacienteType } = require("../../db");

async function getAllPatients(req, res) {
  try {
    const patients = await PacienteType.findAll();
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ error: "error al obtener los pacientes" });
  }
}

async function getPatientsById(req, res) {
  try {
    const { dni } = req.params;
    const patientInfo = await getInfoPatient(dni);
    return res.status(200).json(patientInfo);
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

module.exports = { getAllPatients, getPatientsById };
