const express = require('express');
const { body } = require('express-validator');
const obraController = require('../controllers/obra');
const router = express.Router();
const auth = require('../middleware/is-auth');

router.get('/getAll', obraController.getAll);


module.exports = router;