const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {pool} = require('../configuration/BD'); // Conexión a la base de datos
const JWT_SECRET = 'secreto_super_seguro'; // Cambia este valor a algo más seguro

// Registro de usuarios
exports.register = async (req, res) => {
  const { nombre, apellido, empresa, correo, contraseña, rol } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const emailCheck = await pool.query('SELECT * FROM Usuario WHERE correo = $1', [correo]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar el usuario en la base de datos
    const query = `
      INSERT INTO Usuario (nombre, apellido, empresa, correo, contraseña, rol)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`; // Rol 1: cliente
    const values = [nombre, apellido, empresa, correo, hashedPassword, rol || 'cliente']; // Usar rol 1 si no se proporciona otro valor
    const result = await pool.query(query, values);

    // Responder con el usuario creado
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: result.rows[0], // El usuario recién creado
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Hubo un error al registrar el usuario', details: error.message });
  }
};

// Login de usuarios
exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Verificar si el usuario existe
    const userQuery = 'SELECT * FROM Usuario WHERE correo = $1';
    const result = await pool.query(userQuery, [correo]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const user = result.rows[0];

    // Comparar la contraseña
    const validPassword = await bcrypt.compare(contraseña, user.contraseña);
    if (!validPassword) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign({ idUsuario: user.idusuario, rol: user.idrol }, JWT_SECRET, { expiresIn: '1h' });

    // Configurar la cookie del token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: { nombre: user.nombre, rol: user.idrol } });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Cerrar sesión
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};