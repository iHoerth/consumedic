
const {getAllClinicsHistories} = require("../controllers/clinicHistory/getAllClinicsHistories")

const getClinicHistory = async (req, res)=>{
    try {
        const result = await getAllClinicsHistories();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getClinicHistory,
}