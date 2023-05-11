const { createHorarios } = require("../controllers/horarios/createHorarios")
const { getHorariosById } = require("../controllers/horarios/getHorariosById")

const getHorariosId = async (req, res) =>{
    const {id} = req.params;
    const idMedico=id;
    try {
        const result = await getHorariosById(idMedico)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


const postHorarios = async (req, res) => {
    const { idMedico, agenda } = req.body;
    try {
        const result = await createHorarios(idMedico, agenda)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    postHorarios,
    getHorariosId
}

