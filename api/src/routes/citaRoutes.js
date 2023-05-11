const express = require('express');
const router = express.Router();
const { getAllCitas } = require('../controllers/cita/getAllCitas');


// Ruta para obtener todas las citas
router.get('/', getAllCitas);

module.exports = router;