const { pool } = require('../configuration/BD');

const getSalas = async () => {
  const result = await pool.query('SELECT * FROM Salas');
  return result.rows;
};

const createSala = async (sala) => {
  const { disponibilidad, estadosala, idReservaciones } = sala;
  const result = await pool.query(
    'INSERT INTO Salas (disponibilidad, estadosala, idReservaciones) VALUES ($1, $2, $3) RETURNING *',
    [disponibilidad, estadosala, idReservaciones]
  );
  return result.rows[0];
};

const updateSala = async (idSalas, disponibilidad) => {
  const result = await pool.query(
    'UPDATE Salas SET disponibilidad = $1 WHERE idSalas = $2 RETURNING *',
    [disponibilidad, idSalas]
  );
  return result.rows[0];
};

module.exports = {
  getSalas,
  createSala,
  updateSala,
};