const express = require('express');
const { body } = require('express-validator');
const canchaController = require('../controllers/cancha');
const router = express.Router();
const auth = require('../middleware/is-auth');

router.get('/getAll/:canchaId?', canchaController.getAll);
router.post('/create',[
    body('name')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('establecimientoId')
      .optional()
  ],auth.verifyToken, canchaController.create);

module.exports = router;