const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();
const generoController = require('../../controllers/generosController');

router.get('/', generoController.SelectAll);
router.post('/',
    body('generos_literarios').isLength({ min: 3 }).withMessage('Longitud minima de caracteres: 3.'),
    generoController.Insert);
router.delete('/', generoController.Delete);
module.exports = router;