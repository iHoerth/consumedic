const { User } = require('../db');
// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { email, password, nombre, apellido, telefono } = req.body;
    
    //  para crear Crear el usuario en la base de datos
    const newUser = await User.create({
      email,
      password,
      nombre,
      apellido,
      telefono,
    });

    res.status(201).send("estoy en nuevo usuario wi");
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
};

module.exports = {
  createUser
};
