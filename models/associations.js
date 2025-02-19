const Turno = require('./turno'); 
const Establecimiento = require('./establecimiento'); 
const Cancha = require('./cancha'); 


Establecimiento.hasMany(Cancha, {
    foreignKey: 'establecimientoId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Cancha.belongsTo(Establecimiento, {
    as: 'Establecimiento',
    foreignKey: 'establecimientoId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});