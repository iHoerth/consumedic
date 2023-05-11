// auth.js
const { DoctorType, PacienteType } = require("../db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Función para generar un token JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    isDoctor: user.isDoctor,
  };
  return jwt.sign(payload, "secret_key", { expiresIn: "1h" }); // Cambia 'secret_key' por tu propia clave secreta y ajusta la expiración según tus necesidades
}

// Controlador para el login de doctor
async function loginDoctor(req, res) {
  const { email, password } = req.body;
  try {
    // Buscar al doctor por su email en la base de datos
    const doctor = await DoctorType.findOne({ where: { email } });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generar el token JWT y enviarlo en la respuesta
    const token = generateToken(doctor);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Controlador para el login de paciente
async function loginPatient(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar al paciente por su email en la base de datos
    const patient = await PacienteType.findOne({ where: { email } });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generar el token JWT y enviarlo en la respuesta
    const token = generateToken(patient);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  loginDoctor,
  loginPatient,
};
