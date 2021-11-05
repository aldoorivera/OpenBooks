const { Router } = require('express');
const { body } = require('express-validator');
const passportController = require('../../controllers/passportController');
const router = Router();
const controladorCate = require('../../controllers/controladorlibrocategoria');

router.get('/listar', passportController.validarAutenticado, controladorCate.listar);
router.get('/buscar', passportController.validarAutenticado, controladorCate.buscarGenero);
router.post('/guardar', passportController.validarAutenticado, controladorCate.Guardar);
router.delete('/eliminar', passportController.validarAutenticado, controladorCate.Eliminar);
module.exports = router;