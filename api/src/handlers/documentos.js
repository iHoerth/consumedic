const { getDocuments } = require("../controllers/documentos/getDocuments")
const { createDocuments } = require("../controllers/documentos/createDocuments")




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
        const { idHistorialMedico, idPaciente, idMedico, idCita, documento } = req.body;
        if(!idHistorialMedico || !idPaciente || !idMedico || !idCita || !documento) throw new Error("Faltan datos para crear documentos")

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
