const { Router } = require('express');
const { body } = require('express-validator');
const passportController = require('../../controllers/passportController');
const router = Router();
const generoController = require('../../controllers/generosController');

router.get('/listar', passportController.validarAutenticado, generoController.SelectAll);
router.post('/guardar', passportController.validarAutenticado,
    body('generos_literarios').isLength({ min: 3 }).withMessage('Longitud minima de caracteres: 3.'),
    generoController.Insert);
router.delete('/eliminar', passportController.validarAutenticado, generoController.Delete);
module.exports = router;