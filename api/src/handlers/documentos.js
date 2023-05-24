const { getDocuments } = require("../controllers/documentos/getDocuments")
const { createDocuments } = require("../controllers/documentos/createDocuments")
const cloudinary = require("../utils/cloudinary")



const getDocumentos = async (req, res) =>{
    try {
        const {idHistorialMedico, idPaciente, idMedico, idCita} = req.body;
        if(!idHistorialMedico || !idPaciente || !idMedico || !idCita) throw new Error("Faltan datos para buscar documentos")
        
        const result = await getDocuments(idHistorialMedico, idPaciente, idMedico, idCita)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


const postDocumentos = async (req, res) => {
    try {
        const {idCita,files64, idMedico, idPaciente, titulo} = req.body

        if(!idCita || !files64 || !idMedico || !idPaciente || !titulo) throw new Error("faltan datos; Debe proporcionar: idCita, archivo en base 64, idMedico, idPaciente y Titulo del archivo")

        const cloudinaryResult = await cloudinary.uploader.upload(files64, {
            folder: "Documentos Pacientes",
        })
        if(!cloudinaryResult) throw new Error("Error en la carga del archivo a Cloudinary")

        const imagenCloudinary = cloudinaryResult.secure_url;
        const result = await createDocuments(idCita, imagenCloudinary, idMedico, idPaciente, titulo)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


module.exports = {
    getDocumentos,
    postDocumentos
}
