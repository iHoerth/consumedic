const { DoctorType } = require('../db'); 

async function getinfodoctor(req, res) {
  try {
    const infoDoctor = await DoctorType.findAll();
    return infoDoctor
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la info del Doctor' });
  }
}

module.exports = {
    getinfodoctor
}