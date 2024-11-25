const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Modelo Sala
const Sala = sequelize.define('Sala', {
    idsalas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        serial: true,
    },
    disponibilidad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Sala;