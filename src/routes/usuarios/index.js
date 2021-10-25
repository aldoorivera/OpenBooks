const { Router } = require('express');
const { body } = require('express-validator');
const passportController = require('../../controllers/passportController');
const router = Router();
const controladorUsuarios = require('../../controllers/controladorusuarios');

router.get('/listar', passportController.validarAutenticado, controladorUsuarios.listar);
router.post('/guardar',
    body('password').isLength({ min: 8 }).withMessage('Longitud minima de caracteres es de 8.')
    .matches(/^(?=.\d)(?=.*[a-z])(?=.*[A-Z])[A-zA-Z\d@$.!%*#?&]/),
    body('nombre_usuario').isLength({ min: 3 }).withMessage('Longitud minima de caracteres es de 3.'),
    body('apellido_usuario').isLength({ min: 3 }).withMessage('Longitud minima de caracteres es de 3.'),
    body('email').isEmail().withMessage('Debe de tener un formato de correo electronico'),
    controladorUsuarios.GuardarUsuario);
router.delete('/eliminar', passportController.validarAutenticado, controladorUsuarios.EliminarUsuario);
router.put('actualizar/', passportController.validarAutenticado, controladorUsuarios.ActualizarUsuario);
module.exports = router;