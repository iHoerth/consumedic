const { getDoctor } = require("../controllers/doctors/getDoctor");
const { getAllDoctors } = require("../controllers/doctors/getAllDoctors");
const { getDoctorById } = require("../controllers/doctors/getDoctorById");
const { createDoctor } = require("../controllers/doctors/createDoctor");
const { modifyDoctor } = require("../controllers/doctors/modifyDoctor");
const bcrypt = require("bcrypt");

const getDoctors = async (req, res) => {
  const { email } = req.query;
  try {
    const result = email ? await getDoctor(email) : await getAllDoctors();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctorsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getDoctorById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postDoctor = async (req, res) => {
  const {
    dni,
    NumMatricula,
    nombre,
    apellido,
    email,
    telefono,
    direccion,
    imagen,
    password,
    titulo,
    Descripcion,
    idEspecialidad,
    idObraSocial,
  } = req.body;

  try {
    // Generar un hash de la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createDoctor(
      dni,
      NumMatricula,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      imagen,
      hashedPassword,
      titulo,
      Descripcion,
      idEspecialidad,
      idObraSocial
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putDoctor = async (req, res) => {
  const { id, status } = req.body;
  try {
    const result = await modifyDoctor(id, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDoctors,
  getDoctorsById,
  postDoctor,
  putDoctor,
};
