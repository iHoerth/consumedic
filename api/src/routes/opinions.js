const express = require('express');
const router = express.Router();
const opinionsController = require('../controllers/opinionsController');

// Ruta GET para obtener todas las opiniones
router.get('/', opinionsController.getAllOpinions);

module.exports = router;