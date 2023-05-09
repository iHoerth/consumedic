const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

module.exports = router;