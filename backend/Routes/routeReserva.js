const express = require("express");
const router = express.Router();
const reservationController = require("../controller/controllerReserva").default;

// Rutas
router.post("/reservations", reservationController.createReservation);
router.get("/reservations", reservationController.getAllReservations);
router.put("/reservations/:id", reservationController.updateReservationStatus);

module.exports = router;
