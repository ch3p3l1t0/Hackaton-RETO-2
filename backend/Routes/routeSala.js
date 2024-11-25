const express = require('express');
const router = express.Router();
const salaController = require('../controller/controllerSala');

// Rutas
router.get('/salas', salaController.getAllSalas);
router.put('/salas/:id', salaController.updateEstadoSala);

module.exports = router;