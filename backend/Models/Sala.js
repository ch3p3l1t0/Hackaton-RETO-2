const pool = require('../configuration/BD');


// Función para obtener todas las salas
const getSalas = async () => {
  const query = 'SELECT * FROM salas';

  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    throw new Error('Error al obtener las salas: ' + err.message);
  }
};


const updateEstadoSala = async (id, estado) => {
  const query = 'UPDATE salas SET estado = $1 WHERE idsalas = $2 RETURNING *';
  const values = [estado, id];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    throw new Error('Error al actualizar el estado de la sala: ' + err.message);
  }
};


module.exports = { getSalas, updateEstadoSala };