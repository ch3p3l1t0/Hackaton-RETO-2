const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de tener la conexión configurada

const Room = sequelize.define('Room', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Room;
