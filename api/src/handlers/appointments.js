const {
  createAppointment,
} = require("../controllers/appointments/createApponitment");
const {
  deleteAppointmentById,
} = require("../controllers/appointments/deleteAppointmentById");
const {
  getAllAppointments,
} = require("../controllers/appointments/getAllAppointments");
const {
  getAppointmentsByDoctor,
} = require("../controllers/appointments/getAppointmentsByDoctor");
const {
  getAppointmentsByPatient,
} = require("../controllers/appointments/getAppointmentsByPatient");
const {
  getDoctorCalendar,
} = require("../controllers/appointments/getDoctorCalendar");

const getAppointments = async (req, res) => {
  try {
    const result = await getAllAppointments();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAppointmentsDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Debe proporcionar el ID del Doctor");

    const result = await getAppointmentsByDoctor(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAppointmentsPatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Debe proporcionar el ID del Paciente");

    const result = await getAppointmentsByPatient(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Debe proporcionar el ID del Doctor");

    const result = await getDoctorCalendar(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createAppointments = async (req, res) => {
  let { fecha, hora, descripcion, idDoctor, idPatient } = req.body;
  idDoctor=Number(idDoctor);

  if (!fecha || !hora || !descripcion || !idDoctor || !idPatient) {
    throw new Error(
      "Faltan datos; Debe proporcionar: fecha, hora, descripcion, idDoctor, idPaciente"
    );
  }

  try {
    const result = await createAppointment(
      fecha,
      hora,
      descripcion,
      idDoctor,
      idPatient
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteAppointmentById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAppointments,
  createAppointments,
  getAppointmentsDoctor,
  getAppointmentsPatient,
  getCalendar,
  deleteAppointment,
};
