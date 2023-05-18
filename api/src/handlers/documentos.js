const { getDocuments } = require("../controllers/documentos/getDocuments")
const { createDocuments } = require("../controllers/documentos/createDocuments")




const getDocumentos = async (req, res) =>{
    const {idHistorialMedico, idPaciente, idMedico, idCita} = req.body;
    try {
        const result = await getDocuments(idHistorialMedico, idPaciente, idMedico, idCita)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


const postDocumentos = async (req, res) => {
    const { idHistorialMedico, idPaciente, idMedico, idCita, documento } = req.body;
    try {
        const result = await createDocuments(idHistorialMedico, idPaciente, idMedico, idCita, documento)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


module.exports = {
    getDocumentos,
    postDocumentos
}
