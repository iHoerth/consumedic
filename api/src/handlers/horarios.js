const { createHorarios } = require("../controllers/horarios/createHorarios")
const { getHorariosById } = require("../controllers/horarios/getHorariosById")

const { createHorariosBulk } = require("../controllers/horarios/createHorariosBulk")


const getHorariosId = async (req, res) =>{
    try {
        const {id} = req.params;
        const idMedico=id;
        if(!idMedico) throw new Error("Debe proporcionar ID del medico para buscar horarios")
        const result = await getHorariosById(idMedico)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


const postHorarios = async (req, res) => {
    try {
        const { idMedico, agenda } = req.body;
        if(!idMedico || !agenda) throw new Error("Debe proporcionar idMedico y agenda para publicar la misma")
        const result = await createHorarios(idMedico, agenda)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const postHorariosBulk = async (req, res) => {
    try {
        const {agenda, id} = req.body;
        if(!id || !agenda) throw new Error("Debe proporcionar idMedico y agenda para publicar la misma")
        const result = await createHorariosBulk( agenda, id)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    postHorarios,
    getHorariosId,
    postHorariosBulk
}

