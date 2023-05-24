
const {getAllOpinions} = require("../controllers/opinions/getAllOpinions")
const {getOpinionsByDoctor} = require("../controllers/opinions/getOpinionsByDoctor")
const {postOpinions} = require("../controllers/opinions/postOpinions")
const {getOpinionsByPaciente} = require("../controllers/opinions/getOpinionsByPaciente")
 

const getOpinions = async (req, res)=>{
    try {
        const result = await getAllOpinions();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getOpinionsByDr = async (req, res)=>{
    try {
        const {id}=req.params;
        if(!id) throw new Error("Debe proporcionar ID del medico para buscar las opiniones")

        const result = await getOpinionsByDoctor(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getOpinionsByPatient= async (req, res)=>{
    try {
        const {id}=req.params;
        if(!id) throw new Error("Debe proporcionar ID del paciente para buscar las opiniones")

        const result = await getOpinionsByPaciente(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postOpinion = async (req, res)=>{
    try {
        const {ubicacion, puntaje, mensaje, idMedico, idPaciente}=req.body;
        
        const result = await postOpinions(ubicacion, puntaje, mensaje, idMedico, idPaciente);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getOpinions,
    getOpinionsByDr,
    postOpinion,
    getOpinionsByPatient
}