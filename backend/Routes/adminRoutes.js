const express = require('express');
const router = express.Router();
const adminController = require('../Controller/controllerAdmin');

// Listar reservas pendientes
router.get('/reservas', adminController.listReservasPendientes);

// Cambiar estado de reserva
router.post('/reservas/cambiar-estado', adminController.cambiarEstadoReserva);

module.exports = router;