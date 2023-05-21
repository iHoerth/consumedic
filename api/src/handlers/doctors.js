const { getDoctor } = require("../controllers/doctors/getDoctor");
const { getAllDoctors } = require("../controllers/doctors/getAllDoctors");
const { getDoctorById } = require("../controllers/doctors/getDoctorById");
const { createDoctor } = require("../controllers/doctors/createDoctor");
const { modifyDoctor } = require("../controllers/doctors/modifyDoctor");
const { modifyProfileDoctor } = require("../controllers/doctors/modifyProfileDoctor");

const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary")

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
    precio,
    idEspecialidad,
    idObraSocial,
  } = req.body;

  try {
    // Generar un hash de la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const cloudinaryResult = await cloudinary.uploader.upload(imagen, {
      folder: "Doctors",
      width: 300,
      crop: "scale"
    })
    const imagenCloudinary = cloudinaryResult.secure_url;
    // agregar esto en el createDoctor como parametro en reemplazo de imagen
    // imagen: {
    //   public_id: cloudinaryResult.public_id,
    //   url: cloudinaryResult.secure_url
    // }
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

const putDoctorEdit = async (req, res) => {
  const doctorNewDetails = req.body;
  console.log(doctorNewDetails);
  try {
    // console.log(doctorNewDetails.prevImagen);
    // const deletePrevPhoto = await cloudinary.uploader.destroy(doctorNewDetails.prevImagen)
    // console.log(deletePrevPhoto);
    const cloudinaryResult = await cloudinary.uploader.upload(doctorNewDetails.imagen, {
      folder: "Doctors",
      width: 300,
      crop: "scale"
    })
    const imagenCloudinary = cloudinaryResult.secure_url;
    doctorNewDetails.imagen=imagenCloudinary;
    const result = await modifyProfileDoctor(doctorNewDetails);
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
  putDoctorEdit
};
