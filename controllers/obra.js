const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');


exports.getAll = async (req, res, next) => {
    res.status(201).json(
        "ok"
    );
};