const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController.js');

// Ruta para traer todos los doctores
router.get('/', doctorController.getAllDoctors);

module.exports = router;