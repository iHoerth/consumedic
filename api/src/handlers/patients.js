const { getPatient } = require("../controllers/patients/getPatient");
const { getAllPatients } = require("../controllers/patients/getAllPatients");
const { getPatientById } = require("../controllers/patients/getPatientById");
const { createPatient } = require("../controllers/patients/createPatient");
const { modifyPatient } = require("../controllers/patients/modifyPatient");
const bcrypt = require("bcrypt");

const getPatients = async (req, res) => {
  const { email } = req.query;
  try {
    const result = email ? await getPatient(email) : await getAllPatients();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPatientsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getPatientById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postPatient = async (req, res) => {
  const { dni, email, password, telefono, nombre, apellido, idObraSocial } =
    req.body;
  try {
    // Generar un hash de la constraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createPatient(
      dni,
      email,
      hashedPassword,
      telefono,
      nombre,
      apellido,
      idObraSocial
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putPatient = async (req, res) => {
  const { id, status } = req.body;
  try {
    const result = await modifyPatient(id, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPatients,
  getPatientsById,
  postPatient,
  putPatient,
};
