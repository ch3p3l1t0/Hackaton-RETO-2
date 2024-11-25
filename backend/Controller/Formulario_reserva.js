const ReservationModel = require('../models/ReservationModel');

// Controlador para obtener todas las reservas
const getAllReservations = async (req, res) => {
  try {
    const reservations = await ReservationModel.getAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear una nueva reserva
const createReservation = async (req, res) => {
  const { sala, reason, availability, user_id } = req.body;

  try {
    // Verificar si el usuario ya tiene una reserva activa
    const userReservations = await ReservationModel.getUserReservation(user_id);
    if (userReservations.length > 0) {
      return res.status(400).json({ error: 'El usuario ya tiene una reserva activa' });
    }

    // Crear una nueva reserva
    const reservation = await ReservationModel.createReservation({ sala, reason, availability, user_id });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReservations,
  createReservation,
};
