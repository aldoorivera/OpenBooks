const { Router } = require('express');
const { body } = require('express-validator');
const passportController = require('../../controllers/passportController');
const router = Router();
const libroController = require('../../controllers/controladorautores');

router.get('/listar', passportController.validarAutenticado, controladorAutores.Listar);
router.post('/buscar', passportController.validarAutenticado, controladorAutores.Buscar);
router.post('/guardar', passportController.validarAutenticado, 
    body('nombre_autor').isLength({ min: 2 }).withMessage('Longitud minima de caracteres: 2.'),
    controladorAutores.GuardarAutores);
router.delete('/eliminar', passportController.validarAutenticado, controladorAutores.Eliminar);
router.put('/', passportController.validarAutenticado, controladorAutores.Actualizar);
module.exports = router;