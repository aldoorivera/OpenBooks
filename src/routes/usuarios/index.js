const { Router } = require('express');
const { body } = require('express-validator');
const passportController = require('../../controllers/passportController');
const router = Router();
const controladorUsuarios = require('../../controllers/controladorusuarios');

router.get('/listar', passportController.validarAutenticado, controladorUsuarios.listar);
router.post('/guardar',
    body('idusuarios').isLength({ min: 4 }).withMessage('Longitud minima de caracteres es de 8.'),
    body('password').isLength({ min: 8 }).withMessage('Longitud minima de caracteres es de 8.')
    .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S/),
    body('nombre_usuario').isLength({ min: 3 }).withMessage('Longitud minima de caracteres es de 3.'),
    body('apellido_usuario').isLength({ min: 3 }).withMessage('Longitud minima de caracteres es de 3.'),
    body('email').isEmail().withMessage('Debe de tener un formato de correo electronico'),
    controladorUsuarios.GuardarUsuario);
router.delete('/eliminar', passportController.validarAutenticado, controladorUsuarios.EliminarUsuario);
router.put('actualizar/', passportController.validarAutenticado, controladorUsuarios.ActualizarUsuario);
module.exports = router;