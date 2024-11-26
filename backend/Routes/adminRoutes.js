const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Listar reservas pendientes
router.get('/reservas', adminController.listReservasPendientes);

// Cambiar estado de reserva
router.post('/reservas/cambiar-estado', adminController.cambiarEstadoReserva);

module.exports = router;