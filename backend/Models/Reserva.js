const { pool } = require('../config/database');

const getReservas = async () => {
  const result = await pool.query('SELECT * FROM Reservaciones');
  return result.rows;
};

const createReserva = async (reserva) => {
  const { estadoReserva, hora, fecha, razon, idUsuario } = reserva;
  const result = await pool.query(
    'INSERT INTO Reservaciones (estadoReserva, hora, fecha, razon, idUsuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [estadoReserva, hora, fecha, razon, idUsuario]
  );
  return result.rows[0];
};

const updateReserva = async (idReservaciones, estadoReserva) => {
  const result = await pool.query(
    'UPDATE Reservaciones SET estadoReserva = $1 WHERE idReservaciones = $2 RETURNING *',
    [estadoReserva, idReservaciones]
  );
  return result.rows[0];
};

module.exports = {
  getReservas,
  createReserva,
  updateReserva,
};