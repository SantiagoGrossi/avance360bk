const fs = require('fs');
const path = require('path');
const Turno = require('../models/turno');
const { validationResult } = require('express-validator');


exports.getAll = async (req, res, next) => {
  const turnos = await Turno.findAll({
    order: [['id', 'DESC']],
  });
  res.status(201).json(
    turnos
  );
};
