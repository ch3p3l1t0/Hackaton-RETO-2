const { DataTypes } = require('sequelize');
const { sequelize } = require('../configuration/BD');

// Modelo Reservación
const Reservacion = sequelize.define('Reservacion', {
    idreservaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        serial: true,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    razon: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    idusuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuarios',
            key: 'idusuario',
        },
    },
    idsala: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Salas',
            key: 'idsalas',
        },
    },
});

module.exports = Reservacion;