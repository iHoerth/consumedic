const { Cita } = require('../../db');

exports.getAllCitas = async (req, res) => {
  try {
    // Obtener todas las citas de la base de datos
    const citas = await Cita.findAll();

    res.status(200).send("estoy pidiendo todas las citas wi");
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las citas.' });
  }
};