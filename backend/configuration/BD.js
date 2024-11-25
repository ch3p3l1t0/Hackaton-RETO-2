const {Pool} = require('pg');

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database: 'Reto-Nido',
    password: 'admin',
    port : 5423
});

const connectDBPG = async() => {
    try {
        await new pool.connect();
        res.status(201).json({message: 'Conexión exitosa en la base de datos'})
    }catch(error){
        res.status(404).json({message: 'No pudo haber conexión a la base de datos'}, error)
    }
}