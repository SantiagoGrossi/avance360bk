const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Establecimiento = sequelize.define('Establecimiento', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    tableName: 'Establecimiento', 
    timestamps: true, 
  });
  
module.exports = Establecimiento;