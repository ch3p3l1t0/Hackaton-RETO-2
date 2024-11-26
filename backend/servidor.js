const { Pool } = require('pg');
const { connectDBPG } = require('./configuration/BD');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');
const usuarioRoutes = require('./Routes/usuarioRoutes');
const reservasRoutes = require('./Routes/routeReserva');
const adminRoutes = require('./Routes/adminRoutes');
const salasRoutes = require('./Routes/routeSala');
const PORT = process.env.PORT || 5000;

dotenv.config();

// Configuración de la app Express
const app = express();

// Middleware para permitir solicitudes con cuerpos JSON
app.use(bodyParser.json());
app.use(cors());  // Para habilitar CORS en tu API

// Ruta para verificar la conexión a la base de datos
app.get('/conect', connectDBPG);

app.use('/auth', authRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', reservasRoutes);
app.use('/api', salasRoutes);
app.use('/api', adminRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
