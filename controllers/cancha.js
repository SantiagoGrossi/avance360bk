const fs = require('fs');
const path = require('path');
const Cancha = require('../models/cancha');
const Establecimiento = require('../models/establecimiento');
const { validationResult } = require('express-validator');


exports.getAll = async (req, res, next) => {

    let canchaId = req.params.canchaId;
    let whereCondition= {};
    if (canchaId && canchaId !== "undefined" && canchaId !== "null") {  
        whereCondition.id = canchaId;
    }
    const canchas = await Cancha.findAll({
      where: whereCondition,
      order: [['id', 'DESC']],
      include: [{
        model: Establecimiento, 
        as: 'Establecimiento', 
        attributes: {  }
    }],

    });
    res.status(201).json(
        canchas
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
    let eid = req.body.establecimientoId;
    var cancha;
    const existingCancha = await Cancha.findByPk(id);
    if(existingCancha){
        //existe, es un update, manejar campos
        cancha = await existingCancha.update({
            Name: name,
            establecimientoId: eid
        });
    }else{
        //es una nueva
        cancha = await Cancha.create({
            Name: name,
            establecimientoId: eid
        });
    }
    res.status(201).json(
        cancha
    ); 
};