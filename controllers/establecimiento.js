const fs = require('fs');
const path = require('path');
const Establecimiento = require('../models/establecimiento');
const { validationResult } = require('express-validator');


exports.getAll = async (req, res, next) => {
    let eid = req.params.eid;
    let whereCondition= {};
    if (eid) {
        whereCondition.id = eid;
    }
    const establecimientos = await Establecimiento.findAll({
    where: whereCondition,
      order: [['id', 'DESC']],
    });
    res.status(201).json(
        establecimientos
    );
};
exports.create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(500).json({
            message: 'ups, validation errors at: ' + errors.array()[0].param,
        });
    }
    let name = req.body.name;
    let id = req.body.id;
    var establecimiento;
    const existingEstablecimiento = await Establecimiento.findByPk(id);
    if(existingEstablecimiento){
        //existe, es un update, manejar campos
        establecimiento = await existingEstablecimiento.update({
            Name: name,
        });
    }else{
        //es una nueva
        establecimiento = await Establecimiento.create({
            Name: name,
        });
    }
    res.status(201).json(
        establecimiento
    ); 
}