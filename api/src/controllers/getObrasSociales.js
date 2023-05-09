const { ObraSocial } = require('../db'); 

async function getObrasSociales(req, res) {
  try {
    const obrasSociales = await ObraSocial.findAll();
    return obrasSociales
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las Obras Sociales' });
  }
}

module.exports = {
    getObrasSociales
}