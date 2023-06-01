const { getDoctor } = require('../controllers/doctors/getDoctor');
const { getAllDoctors } = require('../controllers/doctors/getAllDoctors');
const { getDoctorById } = require('../controllers/doctors/getDoctorById');
const { createDoctor } = require('../controllers/doctors/createDoctor');
const { modifyDoctor } = require('../controllers/doctors/modifyDoctor');
const { modifyProfileDoctor } = require('../controllers/doctors/modifyProfileDoctor');
const { deleteDoctor } = require('../controllers/doctors/deleteDoctor');
const { restoreDoctor } = require('../controllers/doctors/restoreDoctor');
const { getSoftDeletedDoctor } = require('../controllers/doctors/getSoftDeletedDoctor');
const { generateRandomPassword } = require('../utils/generateRandomPw');
const { sendMailPassword } = require("../controllers/mail/sendMailPassword")
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');

const getDoctors = async (req, res) => {
  try {
    const { email } = req.query;
    const result = email ? await getDoctor(email) : await getAllDoctors();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctorsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Falta ID del Doctor para proceder a la busqueda');

    const result = await getDoctorById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postDoctor = async (req, res) => {
  let {
    loggedFromGoogle,
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
    precio,
    idEspecialidad,
    idObraSocial,
    status,
  } = req.body;

  try {
    let imagenCloudinary = ''
    if (loggedFromGoogle) {
      password = generateRandomPassword();
      console.log('** && **', password);
      const sendMail = async (email, password) => {
        await sendMailPassword(email, password)
      }
      sendMail(email, password)
      dni = null;
      telefono = null;
      idObraSocial = null;
      idEspecialidad = null;
      //! capaz que aca hay que poner mas cosas, ver eso
      status = 'incomplete';
    } else {
      if (
        !dni ||
        !NumMatricula ||
        !nombre ||
        !apellido ||
        !email ||
        !telefono ||
        !direccion ||
        !imagen ||
        !password ||
        !titulo ||
        !Descripcion ||
        !precio ||
        !idEspecialidad ||
        !idObraSocial
      ) {
        throw new Error('Faltan datos para crear Doctor');
      }

      const cloudinaryResult = await cloudinary.uploader.upload(imagen, {
        folder: 'Doctors',
        width: 300,
        crop: 'scale',
      });
      if (!cloudinaryResult) throw new Error('Error en la carga del archivo a Cloudinary');
      imagenCloudinary = cloudinaryResult.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) throw new Error('No se ha podido hashear la contraseña');

    const result = await createDoctor(
      dni,
      NumMatricula,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      imagenCloudinary,
      hashedPassword,
      titulo,
      Descripcion,
      precio,
      idEspecialidad,
      idObraSocial,
      status,
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDoctors = async (req, res) => {
  try {
    const result = await deleteDoctor(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const putDoctor = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) throw new Error('Faltan datos; Debe proporcionar ID y Status');

    const result = await modifyDoctor(id, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putDoctorEdit = async (req, res) => {
  try {
    const doctorNewDetails = req.body;
    if (!Object.keys(doctorNewDetails).length) throw new Error('No se han recibido Datos');

    if (doctorNewDetails.imagen != doctorNewDetails.oldImagen) {
      const cloudinaryResult = await cloudinary.uploader.upload(doctorNewDetails.imagen, {
        folder: 'Doctors',
        width: 300,
        crop: 'scale',
      });
      if (!cloudinaryResult) throw new Error('Error en la carga del archivo a Cloudinary');
      const imagenCloudinary = cloudinaryResult.secure_url;
      doctorNewDetails.imagen = imagenCloudinary;
    }

    const result = await modifyProfileDoctor(doctorNewDetails);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const restoreDoctors = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await restoreDoctor({ id });

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getSoftDeletedDoctors = async (req, res) => {
  try {
    const deletedDoctor = await getSoftDeletedDoctor();
    res.status(200).json(deletedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getDoctors,
  getDoctorsById,
  postDoctor,
  putDoctor,
  putDoctorEdit,
  deleteDoctors,
  getSoftDeletedDoctors,
  restoreDoctors,
};
