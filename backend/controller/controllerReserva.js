const Reservation = require('../Models/Reserva')

// Crear una reserva
exports.createReservation = async (req, res) => {
    try {
        const { room, date } = req.body;
        const reservation = await Reservation.create({ room, date });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Error creando la reserva' });
    }
};

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las reservas' });
    }
};

// Actualizar el estado de una reserva
exports.updateReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        reservation.status = status;
        await reservation.save();
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando la reserva' });
    }
};

module.exports = router;