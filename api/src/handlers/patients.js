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
  try {
    const { id } = req.params;
    if(!id) throw new Error("Debe proporcionar el ID del paciente")
    const result = await getPatientById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postPatient = async (req, res) => {
  try {
    const { dni, email, password, telefono, nombre, apellido, idObraSocial } = req.body;
    if(!dni || !email || !password || !telefono || !nombre || !apellido || !idObraSocial) throw new Error("Faltan datos para poder registrar el Paciente")
    
    // Generar un hash de la constraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    if(!hashedPassword) throw new Error("No se ha podido Hashear la contraseña")

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
  try {
    const { id, status } = req.body;
    if(!id || !status) throw new Error("Faltan datos; Debe proporcionar ID y Status")

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
