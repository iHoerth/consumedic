const { getDoctor } = require("../controllers/doctors/getDoctor")
const {getAllDoctors} = require("../controllers/doctors/getAllDoctors")
const {getDoctorById} = require("../controllers/doctors/getDoctorById")
const {createDoctor} = require("../controllers/doctors/createDoctor")
const {modifyDoctor} = require("../controllers/doctors/modifyDoctor")


const getDoctors = async (req, res)=>{
    const {name} = req.query;
    try {
        const result = name ? await getDoctor(name) : await getAllDoctors();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getDoctorsById = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await getDoctorById(id);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const postDoctor = async (req, res) => {
    const { dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagen, password, titulo, Descripcion } = req.body;
    try {
        const result = await createDoctor(dni, NumMatricula, nombre, apellido, email, telefono, direccion, imagen, password, titulo, Descripcion)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const putDoctor = async (req, res) => {
    const {id, status}=req.body;
    try {
        const result = await modifyDoctor(id,status);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    getDoctors,
    getDoctorsById,
    postDoctor,
    putDoctor
}