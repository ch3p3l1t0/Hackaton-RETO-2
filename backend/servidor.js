const { Pool } = require('pg');
const { connectDBPG } = require('./configuration/BD');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./Routes/usuarioRoutes');
const reservasRoutes = require('./Routes/routeReserva');
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


app.post('/api/reservaciones', async (req, res) => {
    const { userId, roomId, fecha_inicio, fecha_fin, motivo } = req.body;
    try {
      const room = await Room.findByPk(roomId);
      if (!room) {
        return res.status(404).json({ message: 'Salón no encontrado' });
      }
  
      const reservation = await Reservation.create({
        user_id: userId,
        room_id: roomId,
        fecha_inicio,
        fecha_fin,
        motivo,
      });
  
      res.status(201).json(reservation);
    } catch (err) {
      res.status(500).send("Error creando la reserva");
    }
  });

app.use('/api', usuarioRoutes);
app.use('/api', reservasRoutes);
app.use('/api', salasRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
