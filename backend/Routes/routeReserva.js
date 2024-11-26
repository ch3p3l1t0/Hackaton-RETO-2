const express = require('express');
const router = express.Router();
const reservasController = require('../Controller/controllerReserva');

router.get('/reservas', reservasController.listReservas);
router.post('/create', reservasController.createReserva);
router.put('/reservas/:idReservaciones', reservasController.updateReserva);

module.exports = router;