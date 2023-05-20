

const {getAllDoctorsByPatient} = require("../controllers/doctors/getAllDoctorsByPatient")


const getDoctorsByPatients = async (req, res)=>{
    try {
        const {id} = req.params

        console.log(id);
        const result = await getAllDoctorsByPatient(Number(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getDoctorsByPatients,
}