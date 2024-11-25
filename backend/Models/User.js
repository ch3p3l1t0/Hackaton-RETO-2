const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Modelo Usuario
const Usuario = sequelize.define('Usuario', {
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        serial: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    empresa: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
});

module.exports = Usuario;