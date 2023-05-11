const express = require('express');
const router = express.Router();
const { createCita } = require('../controllers/cita/createCita');

// Ruta para crear una cita
router.post('/', createCita);

module.exports = router;