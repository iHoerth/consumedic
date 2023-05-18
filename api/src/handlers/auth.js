require("dotenv").config();
const { GOOGLE_CLIENT_ID, SECRET_KEY } = process.env;

const { DoctorType, PacienteType } = require("../db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

// Configura el cliente de autenticación de Google
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Función para generar un token JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    isDoctor: user.isDoctor,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // Cambia 'secret_key' por tu propia clave secreta y ajusta la expiración según tus necesidades
}

// Controlador para el login de doctor
async function loginDoctor(req, res) {
  const { email, password, tokenId } = req.body; // email, password, token
  console.log("loginDoctor");
  try {
    if (tokenId) {
      // Verificar el token de Google
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: GOOGLE_CLIENT_ID, // Reemplaza con tu ID de cliente de Google
      });

      const payload = ticket.getPayload();
      const googleEmail = payload.email;

      // Buscar al doctor por su email en la base de datos
      const doctor = await DoctorType.findOne({
        where: { email: googleEmail },
      }); // googleEmail
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      // Verificar la contraseña
      // const isMatch = await bcrypt.compare(password, doctor.password);

      // if (!isMatch) {
      //   return res.status(401).json({ message: "Invalid credentials" });
      // }

      // Generar el token JWT y enviarlo en la respuesta
      const token = generateToken(doctor);
      res.json({ token, isDoctor: true });
    } else {
      //buscar doctor por su email en la bd
      const doctor = await DoctorType.findOne({ where: { email: email } });

      if (!doctor) {
        return res.status(404).json({ message: "doctor not found" });
      }
      //aca se compara la contraseña, pero si uno inicia sesion con goolge no hace falta enviar la contraseña
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, doctor.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generar el token JWT y enviarlo en la respuesta
      const token = generateToken(doctor);
      res.json({ token, isDoctor: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Controlador para el login de paciente
async function loginPatient(req, res) {
  //aca recibis como token
  const { email, password, tokenId } = req.body; // email, password, token
  console.log(tokenId, " - ", req.body);
  try {
    if (tokenId) {
      console.log("acaaaaaa");
      // Verificar el token de Google
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: GOOGLE_CLIENT_ID, // Reemplaza con tu ID de cliente de Google
      });

      const payload = ticket.getPayload();
      const googleEmail = payload.email;

      // Buscar al paciente por su email en la base de datos
      const patient = await PacienteType.findOne({
        where: { email: googleEmail },
      }); // googleEmail

      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      //aca se compara la contraseña, pero si uno inicia sesion con goolge no hace falta enviar la contraseña
      // Verificar la contraseña
      // const isMatch = await bcrypt.compare(password, patient.password);

      // if (!isMatch) {
      //   return res.status(401).json({ message: "Invalid credentials" });
      // }

      // Generar el token JWT y enviarlo en la respuesta
      const token = generateToken(patient);
      res.json({ token, isDoctor: false });
    } else {
      //mientras le podes poner asi para que responda si o si algo
      console.log("aqqqqquuuiiiii");

      // Buscar al paciente por su email en la base de datos
      const patient = await PacienteType.findOne({
        where: { email: email },
      }); // googleEmail

      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      //aca se compara la contraseña, pero si uno inicia sesion con goolge no hace falta enviar la contraseña
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, patient.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generar el token JWT y enviarlo en la respuesta
      const token = generateToken(patient);
      res.json({ token, isDoctor: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  loginDoctor,
  loginPatient,
};
