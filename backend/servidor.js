// Importar dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const authRoutes = require('./Routes/authRoutes');
const usuarioRoutes = require('./Routes/usuarioRoutes');
const reservasRoutes = require('./Routes/routeReserva');
const adminRoutes = require('./Routes/adminRoutes');
const salasRoutes = require('./Routes/routeSala');

// Configuración de dotenv para leer variables del archivo .env
dotenv.config();

// Crear una nueva instancia de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware para permitir solicitudes con cuerpos JSON y habilitar CORS
app.use(bodyParser.json());
app.use(cors());  // Habilitar CORS para todas las solicitudes

// Ruta para verificar la conexión a la base de datos
app.get('/conect', (req, res) => {
  pool
    .connect()
    .then(client => {
      return client.query('SELECT NOW()')
        .then(result => {
          res.status(200).json({ message: 'Conexión exitosa', time: result.rows[0] });
          client.release();
        })
        .catch(err => {
          res.status(500).json({ message: 'Error de conexión a la base de datos', error: err });
        });
    });
});

// Ruta de ejemplo para agregar una reserva (similar a la que tenías en `FormularioReservacion.js`)
app.post('/api/reservations', (req, res) => {
  const { estadoReserva, hora, fecha, razon, idUsuario } = req.body;

  // Validar los datos recibidos
  if (!estadoReserva || !hora || !fecha || !razon || !idUsuario) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  // Insertar la reserva en la base de datos
  const query = `
    INSERT INTO Reservaciones (estadoReserva, hora, fecha, razon, idUsuario)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;
  const values = [estadoReserva, hora, fecha, razon, idUsuario];

  pool.query(query, values)
    .then(result => {
      res.status(201).json({ message: 'Reserva creada con éxito', reservation: result.rows[0] });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error al insertar la reserva', error: err });
    });
});

// Rutas adicionales (puedes agregarlas según las necesidades de tu proyecto)
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

app.use('/auth', authRoutes);
app.use('/api', usuarioRoutes);
app.use('/reserver', reservasRoutes);
app.use('/api', salasRoutes);
app.use('/admin', adminRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
