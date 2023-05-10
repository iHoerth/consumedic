const { getSpecialty } = require("../controllers/specialties/getSpecialty")
const {getAllSpecialties} = require("../controllers/specialties/getAllSpecialties")



const getSpecialties = async (req, res)=>{
    const {name} = req.query;
    try {
        const result = name ? await getSpecialty(name) : await getAllSpecialties();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getSpecialties,
}