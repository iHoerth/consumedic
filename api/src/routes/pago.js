const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

// Ruta GET para obtener todos los pagos
router.get('/', pagoController.getAllPagos);

module.exports = router;