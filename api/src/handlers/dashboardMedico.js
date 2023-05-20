const cloudinary = require("../utils/cloudinary")

const {getAllPatientsByDoctor} = require("../controllers/patients/getAllPatientsByDoctor")
const {getPatientHistory} = require("../controllers/patients/getPatientHistory")
const {postAppointmentDocument}=require("../controllers/appointments/postAppointmentDocument")
const {postAppointmentResponse}=require("../controllers/appointments/postAppointmentResponse")

const getPatientsByDoctor = async (req, res)=>{
    try {
        const {id} = req.params
        console.log(id);
        const result = await getAllPatientsByDoctor(Number(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getHistorialPaciente = async (req, res)=>{
    try {
        const {idMedico, idPaciente} = req.params
        const result = await getPatientHistory(Number(idMedico),Number(idPaciente));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postDoctorResponse = async (req,res)=>{
    try {
        const {idCita,respuesta} = req.body
        // console.log(idCita,respuesta);
        const result = await postAppointmentResponse(idCita,respuesta)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postDoctorDocument = async (req,res)=>{
    try {
        const {idCita,files64, idMedico, idPaciente, titulo} = req.body

        // console.log(idCita,files64, idMedico, idPaciente);

        const cloudinaryResult = await cloudinary.uploader.upload(files64, {
            folder: "Documents",
          })
          const imagenCloudinary = cloudinaryResult.secure_url;

        const result = await postAppointmentDocument(idCita,imagenCloudinary,idMedico, idPaciente,titulo)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    getPatientsByDoctor,
    getHistorialPaciente,
    postDoctorResponse,
    postDoctorDocument
}