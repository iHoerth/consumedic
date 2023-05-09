const { Pago } = require('../db');

// Controlador para obtener todos los pagos
const getAllPagos = async (req, res) => {
  try {
    const pagos = await Pago.findAll();
    res.status(200).send("estoy en pagos wi");
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pagos' });
  }
};
module.exports = {
    getAllPagos
  };