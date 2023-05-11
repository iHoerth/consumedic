
const {getAllClinicsHistories} = require("../controllers/clinicHistory/getAllClinicsHistories")
const {createClinicHistory} = require("../controllers/clinicHistory/createClinicHistory")

const getClinicHistory = async (req, res)=>{
    try {
        const result = await getAllClinicsHistories();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postClinicHistory = async(req, res)=>{
    const {descripcion, fecha,estudio,  documentos,idCita,idPaciente} = req.body;
    try {
        const historial = await createClinicHistory(descripcion, fecha,estudio,  documentos,idCita,idPaciente)
        res.status(200).json(historial)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getClinicHistory,
    postClinicHistory
}