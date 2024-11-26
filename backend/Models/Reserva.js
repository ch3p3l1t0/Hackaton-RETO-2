const { pool } = require('../configuration/BD');

// Obtener todas las reservas
const getReservas = async () => {
  const result = await pool.query('SELECT * FROM Reservaciones');
  return result.rows;
};

// Crear una nueva reserva
const createReserva = async (reserva) => {
  const { estadoReserva, hora, fecha, razon, idUsuario } = reserva;
  const result = await pool.query(
    'INSERT INTO reservaciones (estadoReserva, hora, fecha, razon, idUsuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [estadoReserva, hora, fecha, razon, idUsuario]
  );
  return result.rows[0];
};

// Actualizar el estado de la reserva
const updateReserva = async (idReservaciones, estadoReserva) => {
  const result = await pool.query(
    'UPDATE Reservaciones SET estadoReserva = $1 WHERE idReservaciones = $2 RETURNING *',
    [estadoReserva, idReservaciones]
  );
  return result.rows[0];
};

// Obtener los detalles de una reserva por su ID
const getReservaById = async (idReserva) => {
  const result = await pool.query(
    'SELECT * FROM Reservaciones WHERE idReservaciones = $1',
    [idReserva]
  );
  return result.rows[0];  // Devuelve el primer resultado (la reserva encontrada)
};

// Obtener el correo del usuario asociado con una reserva
const getCorreoByIdReserva = async (idReservaciones) => {
  const result = await pool.query(
    `SELECT u.correo
       FROM Usuario u
       INNER JOIN Reservaciones r ON r.idUsuario = u.idUsuario
       WHERE r.idReservaciones = $1`,
      [idReservaciones]
  );
  
  if (result.rows.length > 0) {
    return result.rows[0].correo;  // Devuelve el correo del usuario
  } else {
    throw new Error('No se encontró el correo del usuario para esta reserva');
  }
};


module.exports = {
  getReservas,
  createReserva,
  updateReserva,
  getReservaById,
  getCorreoByIdReserva,
};
