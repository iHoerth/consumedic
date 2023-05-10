
const {getAllOpinions} = require("../controllers/opinions/getAllOpinions")

const getOpinions = async (req, res)=>{
    try {
        const result = await getAllOpinions();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getOpinions,
}