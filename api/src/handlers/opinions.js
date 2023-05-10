
const {getAllOpinions} = require("../controllers/opinions/getAllOpinions")
const {getOpinionsByDoctor} = require("../controllers/opinions/getOpinionsByDoctor")
const {postOpinions} = require("../controllers/opinions/postOpinions")


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
        const result = await getOpinionsByDoctor(id);
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
    postOpinion
}