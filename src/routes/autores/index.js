const { Router } = require('express');
const { body } = require('express-validator');
const passportController = require('../../controllers/passportController');
const router = Router();
const autorController = require('../../controllers/controladorautores');

router.get('/listar', passportController.validarAutenticado, autorController.Listar);
router.post('/buscar', passportController.validarAutenticado, autorController.Buscar);
router.post('/guardar', passportController.validarAutenticado,
    body('nombre_autor').isLength({ min: 2 }).withMessage('Longitud minima de caracteres: 2.'),
    autorController.GuardarAutores);
router.delete('/eliminar', passportController.validarAutenticado, autorController.Eliminar);
router.put('/', passportController.validarAutenticado, autorController.Actualizar);
module.exports = router;