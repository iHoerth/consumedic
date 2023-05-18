
const {getAllPatientsByDoctor} = require("../controllers/patients/getAllPatientsByDoctor")
const {getPatientHistory} = require("../controllers/patients/getPatientHistory")

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



module.exports = {
    getPatientsByDoctor,
    getHistorialPaciente
}