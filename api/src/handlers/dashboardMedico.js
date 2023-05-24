const cloudinary = require("../utils/cloudinary")

const {getAllPatientsByDoctor} = require("../controllers/patients/getAllPatientsByDoctor")
const {getPatientHistory} = require("../controllers/patients/getPatientHistory")
const {postAppointmentDocument}=require("../controllers/appointments/postAppointmentDocument")
const {postAppointmentResponse}=require("../controllers/appointments/postAppointmentResponse")

const getPatientsByDoctor = async (req, res)=>{
    try {
        const {id} = req.params
        if(!id) throw new Error("Debe propocionar el ID del Medico")

        const result = await getAllPatientsByDoctor(Number(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getHistorialPaciente = async (req, res)=>{
    try {
        const {idMedico, idPaciente} = req.params
        if(!idMedico || !idPaciente) throw new Error("Debe propocionar el ID del Medico y el ID del paciente para ver el Historial")

        const result = await getPatientHistory(Number(idMedico),Number(idPaciente));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postDoctorResponse = async (req,res)=>{
    try {
        const {idCita,respuesta} = req.body
        if(!idCita || !respuesta) throw new Error("Debe proporcionar el Id de la cita y la respuesta para publicar la misma")

        const result = await postAppointmentResponse(idCita,respuesta)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postDoctorDocument = async (req,res)=>{
    try {
        const {idCita,files64, idMedico, idPaciente, titulo} = req.body

        if(!idCita || !files64 || !idMedico || !idPaciente || !titulo) throw new Error("faltan datos; Debe proporcionar: idCita, archivo en base 64, idMedico, idPaciente y Titulo del archivo")

        const cloudinaryResult = await cloudinary.uploader.upload(files64, {
            folder: "Documentos Medicos",
        })
        if(!cloudinaryResult) throw new Error("Error en la carga del archivo a Cloudinary")

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