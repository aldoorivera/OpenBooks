const { Router } = require('express');
const { body } = require('express-validator');
const controladorAutenticacion = require('../controllers/passportController');
const router = Router();
router.post('/login',
    body('usuario')
    .isEmpty().withMessage('Debe enviar los datos del usuario correo o login'),
    body('password')
    .isLength({ min: 6 }).withMessage('La longitud minima de la contraseña es de 6 caracteres'),
    controladorAutenticacion.Login
);
router.get('/error', controladorAutenticacion.ValidarToken);
module.exports = router;