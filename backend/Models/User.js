const { pool } = require('../configuration/BD');

const getUsuarios = async () => {
  const result = await pool.query('SELECT * FROM Usuario');
  return result.rows;
};

const getUsuarioById = async (idUsuario) => {
  const result = await pool.query('SELECT * FROM Usuario WHERE idUsuario = $1', [idUsuario]);
  return result.rows[0];
};

const createUsuario = async (usuario) => {
  const { nombre, apellido, empresa, correo, contraseña, rol } = usuario;
  const result = await pool.query(
    'INSERT INTO Usuario (nombre, apellido, empresa, correo, contraseña, rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [nombre, apellido, empresa, correo, contraseña, rol]
  );
  return result.rows[0];
};

const updateUsuario = async (idUsuario, usuario) => {
  const { nombre, apellido, empresa, correo, contraseña, rol } = usuario;
  const result = await pool.query(
    'UPDATE Usuario SET nombre = $1, apellido = $2, empresa = $3, correo = $4, contraseña = $5, rol = $6 WHERE idUsuario = $7 RETURNING *',
    [nombre, apellido, empresa, correo, contraseña, rol, idUsuario]
  );
  return result.rows[0];
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
};