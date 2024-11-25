const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Ruta para obtener todas las reservas
router.get('/', reservationController.getAllReservations);

// Ruta para crear una nueva reserva
router.post('/', reservationController.createReservation);

module.exports = router;
