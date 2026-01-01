const Sequelize = require('sequelize');

const sequelize = new Sequelize('avance360', 'root', 'root',{
    dialect: 'mysql',
    host: 'localhost',
    dialectOptions: {
        useUTC: false, // para leer desde la base de datos
    },
    timezone: '-03:00',
});
module.exports = sequelize