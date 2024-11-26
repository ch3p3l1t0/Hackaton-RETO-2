const reservasModel = require("../Models/Reserva");

const listReservas = async (req, res) => {
  try {
    const reservas = await reservasModel.getReservas();
    res.json(reservas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createReserva = async (req, res) => {
  try {
    const reserva = await reservasModel.createReserva(req.body);
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateReserva = async (req, res) => {
  try {
    const reserva = await reservasModel.updateReserva(
      req.params.idReservaciones,
      req.body.estadoReserva
    );
    res.json(reserva);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  listReservas,
  createReserva,
  updateReserva,
};
