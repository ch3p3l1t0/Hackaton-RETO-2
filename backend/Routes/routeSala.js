const express = require('express');
const router = express.Router();
const salasController = require('../controllers/controllerSala');

router.get('/salas', salasController.listSalas);
router.post('/salas', salasController.createSala);
router.put('/salas/:idSalas', salasController.updateSala);

module.exports = router;