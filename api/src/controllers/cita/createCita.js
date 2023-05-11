const { Cita } = require("../../db");

exports.createCita = async (req, res) => {
  try {
    const { fecha, descripcion } = req.body;

    // Crea una nueva cita en la base de datos
    const cita = await Cita.create({ fecha, descripcion });

    res.status(201).send("estoy en create citas wi");
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear la cita.' });
  }
};
