const {Pool} = require('pg');

const pool = new Pool{
    user : 'postgres',
    host : 'localhost',
    database: 'Reto-Nido',
    password: 'admin',
}