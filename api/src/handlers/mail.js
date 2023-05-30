const { createMail } = require("../controllers/mail/createMail");
const { sendMailToPaciente } = require("../controllers/mail/sendMailToPaciente")
const { sendMailRespuesta } = require("../controllers/mail/sendMailRespuesta")
const { sendMailDocumento } = require("../controllers/mail/sendMailDocumento")

const { getDoctorById } = require ("../controllers/doctors/getDoctorById")
const { getPatientById } = require("../controllers/patients/getPatientById")
const { sendMailCita } = require("../controllers/mail/sendMailCita")


const postMail = async (req, res) => {
  try {
    const { name, emailRecibe, message, emailEscribe, subject } = req.body;
    
    await createMail(name, emailRecibe, message, emailEscribe, subject);

    res.status(200).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

const postMailToPaciente = async (req, res) => {
  try {
    const { nombreDoctor, apellidoDoctor, emailRecibe, message, emailEscribe, subject } = req.body;    
    await sendMailToPaciente(nombreDoctor, apellidoDoctor, emailRecibe, message, emailEscribe, subject);

    res.status(200).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

const postMailRespuesta = async (req, res) => {
  try {
    const { nombreDoctor, apellidoDoctor, emailRecibe, emailEscribe, subjectRespuesta, messageRespuesta, respuesta} = req.body;
    console.log(req.body);
    await sendMailRespuesta(nombreDoctor, apellidoDoctor, emailRecibe, emailEscribe, subjectRespuesta, messageRespuesta,respuesta);

    res.status(200).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

const postMailDocumento = async (req, res) => {
  try {
    console.log(req.body);
    const { nombreDoctor, apellidoDoctor, emailRecibe, emailEscribe, subjectDocumento, messageDocumento, title} = req.body;
    await sendMailDocumento(nombreDoctor, apellidoDoctor, emailRecibe, emailEscribe, subjectDocumento, messageDocumento, title);

    res.status(200).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

const postMailCita = async (req, res) => {
  try {
    const { fecha, hora, descripcion, idDoctor, idPatient } = req.body;
    
    const doctor = await getDoctorById(idDoctor)
    const paciente = await getPatientById(idPatient)

    const datos = {
      fecha: fecha,
      hora: hora,
      comentario: descripcion,
      nombreDoctor: doctor.nombre,
      apellidoDoctor: doctor.apellido,
      direccion: doctor.direccion,
      email: doctor.email ,
      emailPaciente: paciente.email
    }
    await sendMailCita(datos);

    res.status(200).json({ message: "Mensaje enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

module.exports = {
  postMail,
  postMailToPaciente,
  postMailRespuesta,
  postMailDocumento,
  postMailCita
};
