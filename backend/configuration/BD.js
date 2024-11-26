const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Reto-Nido',
  password: 'Admin',
  port: 5432,  // Asegúrate de que este es el puerto correcto
});

const connectDBPG = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('Conexión exitosa en la base de datos');
  } catch (error) {
    console.error('No se pudo establecer conexión con la base de datos:', error.message);
    throw error; // Lanza el error para que lo manejes donde se llame a esta función
  } finally {
    if (client) {
      client.release(); // Asegura que el cliente se libere siempre
    }
  }
};

connectDBPG();
module.exports = { pool };
