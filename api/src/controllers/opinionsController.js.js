const { Opinion } = require('../models'); 

async function getAllOpinions(req, res) {
  try {
    const opinion = await Opinion.findAll(); // Obtiene todas las opiniones de la base de datos
    return res.status(200).send("estoy en opiniones wi");
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las opiniones' });
  }
}

module.exports = {
  getAllOpinions
};