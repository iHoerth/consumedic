const { getDoctor } = require("../controllers/doctors/getDoctor");
const { getAllDoctors } = require("../controllers/doctors/getAllDoctors");
const { getDoctorById } = require("../controllers/doctors/getDoctorById");
const { createDoctor } = require("../controllers/doctors/createDoctor");
const { modifyDoctor } = require("../controllers/doctors/modifyDoctor");
const { modifyProfileDoctor } = require("../controllers/doctors/modifyProfileDoctor");

const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary")

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
    if(!id) throw new Error("Falta ID del Doctor para proceder a la busqueda")

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
    if(!dni ||
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
      !idObraSocial) throw new Error ("Faltan datos para crear Doctor")
    
      const hashedPassword = await bcrypt.hash(password, 10);
      if(!hashedPassword) throw new Error("No se ha podido hashear la contraseña")

    const cloudinaryResult = await cloudinary.uploader.upload(imagen, {
      folder: "Doctors",
      width: 300,
      crop: "scale"
    })
    if(!cloudinaryResult) throw new Error("Error en la carga del archivo a Cloudinary")
    const imagenCloudinary = cloudinaryResult.secure_url;
    
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
  try {
    const { id, status } = req.body;
    if(!id || !status) throw new Error("Faltan datos; Debe proporcionar ID y Status")

    const result = await modifyDoctor(id, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putDoctorEdit = async (req, res) => {
  
  try {
    const doctorNewDetails = req.body;
    if(!doctorNewDetails) throw new Error("No se han recibido Datos")
    
    const cloudinaryResult = await cloudinary.uploader.upload(doctorNewDetails.imagen, {
      folder: "Doctors",
      width: 300,
      crop: "scale"
    })
    if(!cloudinaryResult) throw new Error("Error en la carga del archivo a Cloudinary")
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
