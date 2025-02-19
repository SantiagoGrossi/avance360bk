const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Turno = sequelize.define('Turno',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },

});

module.exports = Turno;