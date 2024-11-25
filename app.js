const express = require('express');
const bodyParser = require('body-parser');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/reservations', reservationRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
