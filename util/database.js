const Sequelize = require('sequelize');

const sequelize = new Sequelize('turnos', 'root', 'Sumorenito19!',{
    dialect: 'mysql',
    host: 'localhost',
    dialectOptions: {
        useUTC: false, // para leer desde la base de datos
    },
    timezone: '-03:00',
});
module.exports = sequelize