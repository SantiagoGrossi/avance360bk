const express = require('express');
const { body } = require('express-validator');
const establecimientoController = require('../controllers/establecimiento');
const router = express.Router();
const auth = require('../middleware/is-auth');

router.get('/getAll/:eid?', establecimientoController.getAll);
router.post('/create',[
    body('name')
      .isString()
      .isLength({ min: 3 })
      .trim(),
  ],auth.verifyToken, establecimientoController.create);//es posible configurar mas de una verificacion como auth.verifytoken en cadena


module.exports = router;