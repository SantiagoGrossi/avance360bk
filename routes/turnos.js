const express = require('express');
const { body } = require('express-validator');
const turnoController = require('../controllers/turno');
const router = express.Router();
const auth = require('../middleware/is-auth');

router.get('/getAll',auth.verifyToken, turnoController.getAll);


module.exports = router;